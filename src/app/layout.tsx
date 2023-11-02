import "./globals.css";
import type { Metadata } from "next";
import { Zilla_Slab } from "next/font/google";
import Provider from "./_trpc/Provider";
import WagmiConfigWrapper from "./_components/web3modalbootstrap";
import SearchProvider from "./contexts/SearchContext";

const zilla_slab = Zilla_Slab({
  weight: ["500", "700", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={zilla_slab.className + " " + "bg-[#121212] text-white h-full"}>
        <Provider>
          <SearchProvider>
            <WagmiConfigWrapper>
              {children}
            </WagmiConfigWrapper>
          </SearchProvider>
        </Provider>
      </body>
    </html>
  );
}
