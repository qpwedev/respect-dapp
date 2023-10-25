import Header from "./_components/Header";
import WidgetPersonalities from "./_components/widgets/WidgetPersonalities";
import WidgetAccount from "./_components/widgets/WidgetAccount";
import { generateName } from "./_utils/nameGenerator";
import Footer from "./_components/Footer";
import WidgetGraph from "./_components/widgets/WidgetGraph";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const initialGraphData = await serverClient.getAttestations();

  return (
    <main className="flex flex-col p-5 lg:h-screen">
      <Header />
      <div className="mt-[36px] flex flex-col gap-5 lg:grid lg:flex-1 lg:grid-cols-2 lg:grid-rows-2">
        <WidgetAccount
          handle={generateName()}
          className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2"
        />
        <WidgetGraph
          initialGraphData={initialGraphData}
          className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3"
        />

        <WidgetPersonalities className="lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3" />
      </div>

      

      <Footer />
    </main>
  );
}
