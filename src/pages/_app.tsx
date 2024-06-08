import Layout from "@/components/layout";
import LayoutAdmin from "@/components/layoutAdmin";
import SnackBar from "@/components/snackBar";
import { store } from "@/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Provider store={store}>
          <LayoutAdmin>
            <Component {...pageProps} />
            <SnackBar />
          </LayoutAdmin>
        </Provider>
      </SessionProvider>
    </>
  );
}
