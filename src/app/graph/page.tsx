import { GraphWrapper } from "../_components/Graph";
import Header from "../_components/Header";
import SearchBar from "../_components/SearchBar";
import { serverClient } from "../_trpc/serverClient";

export default async function GraphPage() {
  const initialGraphData = await serverClient.getAttestations();

  return (
    <main className="lg:h-screen flex flex-col">
      <div className="absolute w-full z-50 p-5">
        <Header />
      </div>
      <div className="h-full">
        <SearchBar />
        <GraphWrapper initialGraphData={initialGraphData} />
      </div>
    </main>
  );
}
