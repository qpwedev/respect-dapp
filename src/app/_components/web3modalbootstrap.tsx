"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { linea, lineaTestnet } from "wagmi/chains";

const projectId = "55b423b221b5f9f37b5de4fc3a5a2eb8";

const wagmiConfigMetadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [linea, lineaTestnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: wagmiConfigMetadata,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function WagmiConfigWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
