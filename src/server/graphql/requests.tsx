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
  depth: number;
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

  while (queue.length > 0) {
    const currentNode = queue.shift();

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
      const allAttestationsWithDepth = allAttestations.map((attestation) => {
        return { ...attestation, depth: currentNode.depth };
      });

      if (visited.has(currentNode.address)) {
        const existingAttestations = visited.get(currentNode.address);
        const mergedAttestations = [
          ...new Set([...existingAttestations, ...allAttestationsWithDepth]),
        ];
        visited.set(currentNode.address, mergedAttestations);
      } else {
        visited.set(currentNode.address, allAttestationsWithDepth);
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

  return visited;
}

interface GraphNode {
  id: string;
  group: number; // define what this group represents in your context
  status: number; // define what this status represents in your context
  data: {
    incoming: number;
    outgoing: number;
    depth: number;
  };
}

interface GraphLink {
  source: string;
  target: string;
  value: number; // define what value represents in your links
  type: string;
}

function setDepth(
  depthMap: Map<string, Set<number>>,
  depth: number,
  address: string,
  startAddress: string
) {
  if (address.toLowerCase() === startAddress.toLowerCase()) {
    return;
  }

  if (!depthMap.has(address)) {
    depthMap.set(address, new Set([depth]));
  } else {
    const existingDepth = depthMap.get(address);
    existingDepth?.add(depth);
  }
}

function findTrueDepth(depths: Set<number>): number {
  let trueDepth = 0;
  if (depths.size === 1) {
    trueDepth = Math.max(trueDepth, 0);
  } else if (depths.size === 2) {
    trueDepth = Math.max(trueDepth, Math.max(...Array.from(depths)));
  } else if (depths.size === 3) {
    trueDepth = Math.max(trueDepth, Math.max(...Array.from(depths)) - 1);
  } else if (depths.size === 4) {
    trueDepth = Math.max(trueDepth, Math.max(...Array.from(depths)) - 2);
  }

  return trueDepth;
}

// Define a function to process the attestations
function processData(
  startAddress: string,
  attestationsMap: Map<string, Attestation[]>
) {
  const incomingMap = new Map<string, number>();
  const outgoingMap = new Map<string, number>();
  const depthMap = new Map<string, Set<number>>();
  const trueDepthMap = new Map<string, number>();
  depthMap.set(startAddress.toLowerCase(), new Set([0]));

  // Define arrays for graph nodes and links
  let nodes: GraphNode[] = [];
  let links: GraphLink[] = [];

  // Process attestations
  attestationsMap.forEach((attestations, key) => {
    attestations.forEach((attestation) => {
      // Count incoming attestations
      incomingMap.set(
        attestation.subject,
        (incomingMap.get(attestation.subject) || 0) + 1
      );

      // Count outgoing attestations
      outgoingMap.set(
        attestation.attester,
        (outgoingMap.get(attestation.attester) || 0) + 1
      );

      setDepth(depthMap, attestation.depth, attestation.attester, startAddress);
      setDepth(depthMap, attestation.depth, attestation.subject, startAddress);

      // Add to links array
      links.push({
        source: attestation.attester,
        target: attestation.subject,
        value: 1, // you can define what 'value' should be
        type: "arrow", // assuming all links are of type 'arrow'
      });
    });
  });

  // Create nodes array from incomingMap and outgoingMap
  const allAddresses = new Set([
    ...Array.from(incomingMap.keys()),
    ...Array.from(outgoingMap.keys()),
  ]);

  depthMap.forEach((depths, address) => {
    trueDepthMap.set(address, findTrueDepth(depths));
  });

  allAddresses.forEach((address) => {
    nodes.push({
      id: address,
      group: 1, // assign groups based on your logic
      status: 1, // assign status based on your logic
      data: {
        incoming: incomingMap.get(address) || 0,
        outgoing: outgoingMap.get(address) || 0,
        depth: trueDepthMap.get(address) || 0,
      },
    });
  });

  // Prepare the final graph data
  const graphData = {
    nodes,
    links,
  };

  return graphData;
}

export async function exploreAllAttestations(
  startAddress: string,
  schemaId: string,
  maxDepth: number = 2
): Promise<{
  nodes: GraphNode[];
  links: GraphLink[];
}> {
  const attestationNodes = await bfsTraversal(startAddress, schemaId, maxDepth);

  const processedDataForGraph = processData(startAddress, attestationNodes);

  return processedDataForGraph;
}
