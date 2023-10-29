import { GraphWrapper } from "../../_components/Graph";
import Header from "../../_components/Header";
import SearchBar from "../../_components/SearchBar";
import { serverClient } from "../../_trpc/serverClient";

export default async function GraphPage({
  params,
}: {
  params: { address: string };
}) {
  const initialGraphData = await serverClient.getAttestations(params.address);

  return (
    <main className="lg:h-screen flex flex-col">
      <div className="absolute w-full z-50 p-5">
        <Header address={params.address} />
      </div>
      <div className="h-screen">
        <SearchBar />
        <GraphWrapper
          address={params.address}
          initialGraphData={initialGraphData}
        />
      </div>
    </main>
  );
}
