import { googleConfig } from "@/src/config";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <GoogleOAuthProvider clientId={`${googleConfig.GOOGLE_CLIENT_ID}`}>
      <Component {...pageProps} />
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
}
