import Layout from "@/components/layout";
import SnackBar from "@/components/snackBar";
import { store } from "@/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <SnackBar />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
