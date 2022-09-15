import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <div className="container">
      <h1>Hello THIRDWEB</h1>
      <ConnectWallet accentColor="#f213a4" colorMode="light" />
    </div>
  );
}
