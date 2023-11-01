import { gql } from "@apollo/client/core";
import { client } from "./apolloClient";


const GET_ALL_LINKS_ATTESTATIONS = gql`
  query GetAllLinksAttestations($address: String!, $schemaId: String!) {
    attestations(
      where: { subject: $address, schemaId: $schemaId }
    ) {
      decodedData
      subject
      attester
      attestedDate
    }
  }
`;



export const getAddressLinks = async (address: string) => {
  const result = await client.query({
    query: GET_ALL_LINKS_ATTESTATIONS,
    variables: { address, schemaId: "0x8EE4D75D2724C3132D57FE2F6C32637C3B6A29353E3D5FD3123E1CCAEA255855" },
    fetchPolicy: 'network-only',
  });

  const attestations = result.data.attestations;

  const groupedAttestations = attestations.reduce((acc: any, current: any) => {
    const key = current.decodedData[0];
    if (!acc[key] || Number(acc[key].attestedDate) < Number(current.attestedDate)) {
      acc[key] = current;
    }
    return acc;
  }, {});


  console.log(result.data);
  console.log(groupedAttestations);


  const finalObject = Object.keys(groupedAttestations).reduce((acc: any, key: any) => {
    acc[key] = groupedAttestations[key].decodedData[1];
    return acc;
  }, {});


  return finalObject;
}
