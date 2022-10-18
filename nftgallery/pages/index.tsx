import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="w-full h-screen relative ">
      <Link href="/gallery">
        <span className="sm:ml-auto absolute top-6 right-6 hidden md:block hover:bg-amber-500 transition-all transition-300 transition-linear p-2 rounded-md  font-bold">
          Gallery
        </span>
      </Link>

      <div className=" h-fit md:w-2/5 w-9/12 flex gap-2 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 border-8 border-white">
        <h1 className="md:text-9xl sm:text-6xl text-3xl font-bold absolute -top-20 -left-40 hidden md:block">NFT </h1>
        <div className=" h-full w-4/12 flex flex-col  gap-2 relative">
          <Image
            src="/img/9.jfif"
            width={130}
            height={250}
            alt="image"
            className="rounded-md h-full"
          />
          <Image
            src="/img/3.gif"
            width={120}
            height={125}
            alt="image"
            className="rounded-md"
          />
        </div>
        <div className="w-4/5">
          <h1 className=" md:text-4xl text-center text-2xl  font-semibold pb-4">
            Shill Your Collection
          </h1>
          <div className="w-full flex  ">
            <span className=" ">
              <Image
                src="/img/7.jfif"
                width={220}
                height={460}
                alt="image"
                className="rounded-md "
              />
            </span>
            <span className=" relative md:text-sm  text-xs sm:w-full w-2/4 text-center  flex items-center flex-col p-2 m-2">
              One and only place to see all your NFTs , no matter if they are on
              different chains , we support chains like polygon , ethereum nd
              bsc
              <Link href="/gallery">
                <a className=" w-32 lg:mt-34 md:mt-12 mt-10 bg-green-500 transition-all transition-300 transition-linear p-2 rounded-md z-20 font-bold">
                  Gallery
                </a>
              </Link>
        <h1 className="md:text-9xl sm:text-6xl text-3xl font-bold absolute hidden md:block -bottom-20 -right-96 text-gray-400 ">Station</h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
