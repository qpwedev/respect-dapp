import { GraphWrapper } from "./_components/Graph";
import Header from "./_components/Header";
import RootSearchBar from "./_components/RootSearchBar";

export default async function RootPage() {
  return (
    <main className="lg:h-screen flex flex-col">
      <div className="absolute w-full z-[52] p-5">
        <Header address="0xE8fC349C5554305A89aDad96465bb01E3e4998F6" />
      </div>
      <div className="h-full">
        <RootSearchBar />
        <GraphWrapper isMock />
      </div>
    </main>
  );
}
