import "./globals.css";
import type { Metadata } from "next";
import { Zilla_Slab } from "next/font/google";
import Provider from "./_trpc/Provider";
import WagmiConfigWrapper from "./_components/web3modalbootstrap";
import { ToastContainer, Slide } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const zilla_slab = Zilla_Slab({
  weight: ["500", "700", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Respect - web3 trust graph",
  description:
    "Respect is a DApp implementing an innovational approach to the respect-as-an-asset attestations that allow for the on-chain onboarding referral campaigns development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
      <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/manifest.json"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#ffffff"/>
      </head>
      <body
        className={
          zilla_slab.className + " " + "h-full bg-[#121212] text-white"
        }
      >
        <Provider>
          <WagmiConfigWrapper>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              {children}
            </SkeletonTheme>
          </WagmiConfigWrapper>
        </Provider>
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
      </body>
    </html>
  );
}
