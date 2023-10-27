import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverClient } from "../../_trpc/serverClient";
import Header from "../../_components/Header";
import WidgetAccount from "../../_components/widgets/WidgetAccount";
import { generateName } from "../../_utils/nameGenerator";
import WidgetGraph from "../../_components/widgets/WidgetGraph";
import WidgetPersonalities from "../../_components/widgets/WidgetPersonalities";
import Footer from "../../_components/Footer";

export default async function Home({ params }: { params: { address: string } }) {
  const address = params.address;
  
  const initialGraphData = await serverClient.getAttestations(address);

  return (
    <main className="flex flex-col p-5 lg:h-screen">
      <Header address={address} />
      <div className="mt-[36px] flex flex-col gap-5 lg:grid lg:flex-1 lg:grid-cols-2 lg:grid-rows-2">
        <WidgetAccount
          userLinks={{
            farcaster: "qpwedev",
            github: "qpwedev",
          }}
          address={address}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        limit={1}
      />
    </main>
  );
}
