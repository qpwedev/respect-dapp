import { gql } from "@apollo/client/core";
import { client } from "./apolloClient";

// Define the GraphQL queries
const GET_INCOMING_ATTESTATIONS = gql`
  query GetIncomingAttestations($subject: String!, $schemaId: String!) {
    attestations(where: { subject: $subject, schemaId: $schemaId }) {
      decodedData
      subject
      attester
    }
  }
`;

const GET_OUTGOING_ATTESTATIONS = gql`
  query GetOutgoingAttestations($attester: String!, $schemaId: String!) {
    attestations(where: { attester: $attester, schemaId: $schemaId }) {
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

// BFS function to explore attestations
async function bfsTraversal(
  startAddress: string,
  schemaId: string,
  type: "incoming" | "outgoing",
  maxDepth: number = 2
): Promise<Map<string, Attestation[]>> {
  const visited = new Map<string, Attestation[]>();
  let queue: { address: string; depth: number }[] = [];
  queue.push({ address: startAddress, depth: 0 });

  console.log("Starting BFS traversal");

  console.log(startAddress);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    console.log(currentNode);
    // Avoid revisiting nodes and restrict by maxDepth
    if (
      !currentNode ||
      currentNode.depth >= maxDepth ||
      visited.has(currentNode.address)
    ) {
      continue;
    }

    let result;
    if (type === "incoming") {
      result = await client.query({
        query: GET_INCOMING_ATTESTATIONS,
        variables: { subject: currentNode.address, schemaId: schemaId },
      });
    } else {
      result = await client.query({
        query: GET_OUTGOING_ATTESTATIONS,
        variables: { attester: currentNode.address, schemaId: schemaId },
      });
    }

    const attestations: Attestation[] = result.data.attestations;

    // Store the attestation data in the visited map.
    if (attestations.length > 0) {
      if (visited.has(currentNode.address)) {
        const existingAttestations = visited.get(currentNode.address);
        visited.set(currentNode.address, [
          ...existingAttestations,
          ...attestations,
        ]);
      } else {
        visited.set(currentNode.address, attestations);
      }
    }

    for (const attestation of attestations) {
      const nextAddress =
        type === "incoming" ? attestation.attester : attestation.subject;
      if (!visited.has(nextAddress)) {
        queue.push({ address: nextAddress, depth: currentNode.depth + 1 });
      }
    }
  }

  console.log("Finished BFS traversal");

  console.log(visited);

  return visited; // return the visited map
}

export async function exploreIncomingAttestations(
  startAddress: string,
  schemaId: string,
  maxDepth: number = 2
): Promise<Map<string, Attestation[]>> {
  const data = await bfsTraversal(startAddress, schemaId, "incoming", maxDepth);

  return data;
}

export async function exploreOutgoingAttestations(
  startAddress: string,
  schemaId: string,
  maxDepth: number = 2
): Promise<Map<string, Attestation[]>> {
  return await bfsTraversal(startAddress, schemaId, "outgoing", maxDepth);
}

// exploreIncomingAttestations("0xAddress", "schemaId", 2);

// exploreOutgoingAttestations("0xAddress", "schemaId", 2);
