import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "HealthBase",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#c7f9cc",
          accentColorForeground: "#081c15",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
