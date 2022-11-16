import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Deethon",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#432818",
            accentColorForeground: "#fff",
          })}
        >
          <Navbar />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
