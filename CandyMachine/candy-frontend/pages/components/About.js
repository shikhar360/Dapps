import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  function open() {
    window.open("https://twitter.com/shikkhar_");
  }
  function open2() {
    window.open("https://github.com/shikhar360/Dapps/tree/main/CandyMachine");
  }
  return (
    <div className=" h-screen w-screen bg-cover bg-no-repeat flex flex-col items-center  justify-start bg-[url('/images/about.jpg')] ">
      <div
        className={` flex items-center justify-between bg-fuchsia-700 w-screen text-xl transition-all duration-500 linear px-6 text-white p-1`}
      >
        <div className={`flex items-center justify-center gap-1s `}>
          <span>Candy Machine : About</span>
          <Image src="/images/candy.png" width={50} height={48} alt="image" />
        </div>
        <Link href="/">
          <a> Back to Home 💒</a>
        </Link>
      </div>

      <div
        className={`flex flex-col items-center justify-center w-3/5 h-3/4 bg-white/50 rounded-3xl my-auto `}
      >
        <h1 className="sm:text-4xl text-2xl mb-8">Hello Everyone 😀👋</h1>
        <p className="sm:text-lg text-md  text-center px-4 ">
          My name is Shikhar , M from Varanasi , Uttar Pradesh , India. Hope you
          liked my Decentralized Candy Machine App . Make sure you are on
          🛑RINKEBY NETWORK🛑 In-case the App is not working .
        </p>
        <div className="sm:text-xl text-md text-center mt-4">
          Stacks Used ⚒ 🛠 : Next.js ,TailwindCss, Solidity, Hardhat
        </div>
        <p className="sm:text-lg text-sm  text-center p-8 mb-8">
          You can follow me on{" "}
          <span
            className="underline cursor-pointer bg-sky-400 rounded-lg p-1 underline-offset-4"
            onClick={open}
          >
            Twitter🤚
          </span>{" "}
          . If you want to see the codes of this project then you can{" "}
          <span
            className="underline cursor-pointer bg-gray-900 rounded-lg p-1 text-white underline-offset-4"
            onClick={open2}
          >
            Click Here🚩
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
