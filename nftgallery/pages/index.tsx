import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getNfts from "../utils";
import React, { useEffect, useState } from "react";
import { Nft } from "@ankr.com/ankr.js/dist/types";
import { clearLine } from "readline";
const Home: NextPage = () => {
  const [add, setAdd] = useState<string>("");
  const [nfts, setNfts] = useState<Nft[]>([]);

  async function getAllNFT(add: string) {
    const { nfts } = await getNfts(add);
    console.log(nfts);
    setNfts(nfts);
  }

  function handleAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setAdd(e.target.value);
  }
  return (
    <div className=" scroll-smooth">
      <div
        className={` flex flex-col gap-8 items-center justify-start pt-12 pb-12`}
      >
        <h1 className="text-3xl">Your NFT Gallery</h1>
        <input
          className="w-96 text-center p-2 rounded-md "
          type="text"
          placeholder="Enter your wallet address"
          onChange={handleAddress}
        />
        <button
          className="bg-violet-700 text-stone-100 p-2 rounded-sm hover:bg-green-500 transition-all transition-300 transition-linear "
          onClick={() => getAllNFT(add)}
        >
          Submit
        </button>
      </div>
      <div className=" w-full h-max grid grid-cols-4 items-center gap-12 px-20 ">
        {nfts?.map((nft: Nft, ind: number) => {
          return (
            <div
              key={ind}
              className="w-full h-full rounded-xl flex flex-col items-center justify-start gap-4 border-2 p-4 "
            >
              <img
                src={nft.imageUrl}
                width={100}
                height={100}
                className="h-full w-full rounded-xl"
              />
              <span>{nft.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
