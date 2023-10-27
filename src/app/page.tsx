import { GraphWrapper } from "./_components/Graph";
import Header from "./_components/Header";
import RootSearchBar from "./_components/RootSearchBar";

export default async function RootPage() {

  return (
    <main className="lg:h-screen flex flex-col">
      <div className="absolute w-full z-50 p-5">
        <Header address="" />
      </div>
      <div className="h-full">
        <RootSearchBar />
        <GraphWrapper isMock />
      </div>
    </main>
  );
}
