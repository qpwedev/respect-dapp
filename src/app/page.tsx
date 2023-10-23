import Image from "next/image";
import Header from "./_components/Header";
import WidgetJar from "./_components/widgets/WidgetJar";
import WidgetPersonalities from "./_components/widgets/WidgetPersonalities";
import WidgetAccount from "./_components/widgets/WidgetAccount";
import { generateName } from "./_utils/nameGenerator";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="p-5 h-screen flex flex-col">
      <Header />
      <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-[36px] flex-1">
        <WidgetPersonalities className="col-start-1 col-end-2 row-start-2 row-end-3" />
        <WidgetAccount
          handle={generateName()}
          className="col-start-1 col-end-2 row-start-1 row-end-2"
        />
        <WidgetJar className="col-start-2 col-end-3 row-start-1 row-end-3" />
      </div>

      <Footer />
    </main>
  );
}
