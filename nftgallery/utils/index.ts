import AnkrscanProvider from "@ankr.com/ankr.js";

const provider = new AnkrscanProvider(" ");

export default async function getNfts(address: string) {
  const { assets } = await provider.getNFTsByOwner({
    walletAddress: address,
    blockchain: ["eth", "polygon", "bsc"],
  });

  return {
    nfts: assets,
  };
}
