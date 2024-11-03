import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import "../app/globals.css";
import { CartProvider } from "src/app/context/CartContext";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-custom",
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={montserrat.className}>
      <Head>
        <title>Product catalog</title>
        <link href="/logo.svg" rel="icon" />
      </Head>
      <CartProvider>
        {getLayout(<Component {...pageProps} />)}
      </CartProvider>
    </main>
  );
}
