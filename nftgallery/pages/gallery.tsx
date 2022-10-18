import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import getNfts from "../utils";
import React, { useEffect, useState, useRef } from "react";
import { Nft } from "@ankr.com/ankr.js/dist/types";

const Gallery: NextPage = () => {
  const [add, setAdd] = useState<string>("");

  const [nfts, setNfts] = useState<Nft[]>([]);
  console.log(nfts);
  async function getAllNFT(add: string) {
    const { nfts } = await getNfts(add);

    setNfts(nfts);
  }

  function handleAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setAdd(e.target.value);
  }

  return (
    <div className="  scroll-smooth w-full min-h-screen bg-white  pb-24">
      <div
        className={` flex lg:flex-row flex-col gap-6 items-start justify-start pt-6 px-12 pb-12`}
      >
        <div className="text-2xl flex items-center">
          <span className="font-semibold  text-black ">NFT Gallery</span>
          <Image src="/img/2.gif" alt="image" width={80} height={50} />
        </div>

        <input
          className="w-96 text-center text-black p-2 rounded-md border-2 bg-white "
          type="text"
          placeholder="Enter your wallet address"
          onChange={handleAddress}
        />
        <button
          className="bg-[#06d6a0] text-stone-100 p-2 rounded-sm hover:bg-green-500 transition-all transition-300 transition-linear "
          onClick={() => getAllNFT(add)}
        >
          Submit
        </button>
        <Link href="/">
          <span className="sm:ml-auto absolute top-6 right-6 hover:bg-green-500 transition-all transition-300 transition-linear p-2 rounded-md  text-black  ">
            Home 🏡
          </span>
        </Link>
      </div>
      <div className=" w-full  grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 items-center gap-12 px-20  pb-32">
        {nfts?.map((nft: Nft, ind: number) => {
          return (
            <div
              key={ind}
              className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-4 border-2 p-4 "
            >
              <img
                src={nft.imageUrl}
                alt="image"
                width={100}
                height={100}
                className="h-full w-full rounded-xl"
              />

              <span className="text-sm w-full text-center truncate font-medium text-black">
                {nft.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
