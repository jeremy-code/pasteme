import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider cssVarsRoot="body">
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
