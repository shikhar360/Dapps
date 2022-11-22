import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export default function Home() {
  function handleContact(e :string) {
    window.open(e);
  }
  return (
    <>
      <div className=' bg-[url("/images/1.jpg")]  w-full min-h-screen md:bg-cover bg-auto bg-no-repeat flex flex-col md:items-start items-center md:justify-center justify-center'>
        <h1 className="text-[#d9ed92] font-semibold md:text-7xl pt-4 text-4xl md:ml-28  md:w-2/6 w-2/3 md:text-start text-center">
          {" "}
          Mint Your favourite Cartoon Characters NOW !{" "}
          <span>
            <img
              src="/images/hero.png"
              alt="hrro"
              className="md:w-28 w-36 mx-auto"
            />
          </span>
        </h1>
        <div className=" mt-4  md:ml-28 flex gap-2 md:gap-8 items-center md:justify-start justify-center w-full">
         
          <span className="bg-[#432818] p-1.5 rounded-xl text-lg font-medium hover:scale-105 text-[#ffffff] ">
            Mint NOW !
          </span>
        </div>
      </div>
      <div className="min-h-screen bg-white w-full flex flex-col items-center justify-start">
        <h1 className="md:text-4xl text-2xl font-mono mt-12 mb-6 font-semibold text-[#432818]">
          OG Sponsors{" "}
        </h1>
        <img src="/images/nftport.png" alt="sss" width={500} />
        <div className="w-full flex  justify-evenly items-center ">
          <div className="flex flex-col items-center justify-center ">
            <h6>Easy Minting</h6>
            <img src="/images/abc.png" alt="easy" width={100} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h6>Multi-chain</h6>
            <img src="/images/multi.gif" alt="easy" width={100} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h6>Enhanced Api</h6>
            <img src="/images/sparkel.png" alt="easy" width={100} />
          </div>
        </div>
           
         <div className="w-full flex items-center justify-center ">
          <span className=" bg-orange-600 font-medium text-black md:w-2/4 w-3/4 md:my-14 my-6 rounded-xl p-6 text-center">
            If you wanna mint your NFT on opensea this is the right place to do that , Toonminter is a NFT-Minting platform to mint your NFT in a easy way built on top of NFTPort , You can literally mint your favourite cartoon or any img or any document as a NFT. Head over to our MINT page to do that .
          </span>
         </div>
        
      <footer className="w-full bg-[#432818] flex flex-col items-center ">
        <span className="text-sm my-1 text-white">Made with ❤ by SHIKHAR</span>
        <span className="text-lg mb-3 text-white">Contact Me📡</span>
        <div className="flex items-center justify-center gap-12">
          <div onClick={() => handleContact("https://twitter.com/shikkhar_")}>
            <img
              className="cursor-pointer"
              src="/images/twitter.png"
              alt="bg"
              height={40}
              width={40}
            />
          </div>
          <div onClick={() => handleContact("https://github.com/shikhar360")}>
            <img
              className="cursor-pointer"
              src="/images/github.png"
              alt="bg"
              height={40}
              width={40}
            />
          </div>
          <div
            onClick={() => handleContact("https://linkedin.com/in/shikhar360")}
          >
            <img
              className="cursor-pointer"
              src="/images/linkin.png"
              alt="bg"
              height={40}
              width={40}
            />
          </div>
        </div>
        <span className=" pt-2  text-[#c7c7c7] text-xs">
          ©2022 DEETHON. ALL COPYRIGHTS RESERVED
        </span>
      </footer>
      </div>
    </>
  );
}
