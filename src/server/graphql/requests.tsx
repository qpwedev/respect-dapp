import { gql } from "@apollo/client/core";
import { client } from "./apolloClient";

const GET_ALL_ATTESTATIONS = gql`
  query GetAllAttestations($address: String!, $schemaId: String!) {
    incoming: attestations(where: { subject: $address, schemaId: $schemaId }) {
      decodedData
      subject
      attester
    }
    outgoing: attestations(where: { attester: $address, schemaId: $schemaId }) {
      decodedData
      subject
      attester
    }
  }
`;

interface Attestation {
  decodedData: string;
  subject: string;
  attester: string;
}

async function bfsTraversal(
  startAddress: string,
  schemaId: string,
  maxDepth: number = 2
): Promise<Map<string, Attestation[]>> {
  const visited = new Map<string, Attestation[]>();
  let queue: { address: string; depth: number }[] = [
    { address: startAddress, depth: 0 },
  ];

  console.log("Starting BFS traversal");
  console.log(startAddress);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    console.log(currentNode);

    if (
      !currentNode ||
      currentNode.depth >= maxDepth ||
      visited.has(currentNode.address)
    ) {
      continue;
    }

    const result = await client.query({
      query: GET_ALL_ATTESTATIONS,
      variables: { address: currentNode.address, schemaId: schemaId },
    });

    const allAttestations: Attestation[] = [
      ...result.data.incoming,
      ...result.data.outgoing,
    ];

    if (allAttestations.length > 0) {
      if (visited.has(currentNode.address)) {
        const existingAttestations = visited.get(currentNode.address);
        const mergedAttestations = [
          ...new Set([...existingAttestations, ...allAttestations]),
        ];
        visited.set(currentNode.address, mergedAttestations);
      } else {
        visited.set(currentNode.address, allAttestations);
      }
    }

    for (const attestation of allAttestations) {
      const nextAddresses = [attestation.attester, attestation.subject].filter(
        (addr) => addr !== currentNode.address
      );

      for (const nextAddress of nextAddresses) {
        if (!visited.has(nextAddress)) {
          queue.push({ address: nextAddress, depth: currentNode.depth + 1 });
        }
      }
    }
  }

  console.log("Finished BFS traversal");
  console.log(visited);

  return visited;
}

export async function exploreAllAttestations(
  startAddress: string,
  schemaId: string,
  maxDepth: number = 2
): Promise<Map<string, Attestation[]>> {
  return await bfsTraversal(startAddress, schemaId, maxDepth);
}
