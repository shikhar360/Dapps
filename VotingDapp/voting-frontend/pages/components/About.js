import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  function open() {
    window.open("https://twitter.com/shikkhar_");
  }
  function open2() {
    window.open("https://github.com/");
  }
  return (
    <div className=" h-screen w-screen bg-cover bg-no-repeat flex flex-col bg-[#f6fff8]  items-center  justify-start   ">
      <div
        className={` flex items-center justify-between bg-[#00f5d4] w-screen text-xl transition-all duration-500 linear px-6 text-white p-2`}
      >
        <div
          className={`flex items-center justify-center gap-1s text-black    `}
        >
          <span> About </span>
          {/* <Image src="/images/candy.png" width={50} height={48} alt="image" /> */}
        </div>
        <Link href="/">
          <a className="bg-[#ffd60a] p-1 rounded-xl text-black "> Home 💒</a>
        </Link>
      </div>

      <div
        className={`flex flex-col items-center justify-center w-3/5 h-3/4 bg-white/25 border-4 border-[#d80032] shadow-xl shadow-[#fbc3bc] hover:scale-105 rounded-3xl my-auto transition-all duration-300 linear`}
      >
        <h1 className="sm:text-4xl text-2xl mb-8">👋 Hello Developers 👨‍💻</h1>
        <p className="sm:text-xl text-md  text-center px-4 ">
          My name is Shikhar (a Web3.0 enthusiast) , welcoming you to my Voting
          Dapp , You can Vote your favourite Candidate just by clicking the
          candidate card , Yes its that easy , You can only vote once (Make sure
          you are on GOERLI NETWORK ) . This project was made using next.js
          tailwindcss , hardhat , solidity and ❤
        </p>

        <p className="sm:text-xl text-sm  text-center p-8 mb-8">
          You can follow me on{" "}
          <span
            className="underline cursor-pointer bg-sky-400 rounded-lg p-1 underline-offset-4"
            onClick={open}
          >
            Twitter🐤
          </span>{" "}
          . If you want to see the codes of this project then you can visit{" "}
          <span
            className="underline cursor-pointer bg-gray-900 rounded-lg p-1 text-white underline-offset-4"
            onClick={open2}
          >
            Github🔱
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
