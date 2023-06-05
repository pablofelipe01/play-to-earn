import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';
import { Polygon } from '@thirdweb-dev/chains';
import "../styles/globals.css";
import NavBar from "../components/NavBar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={Polygon}>
        <ChakraProvider>
          <NavBar />
            <Component {...pageProps} />
        </ChakraProvider>
     </ThirdwebProvider>
  );
}

export default MyApp;
