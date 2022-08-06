import Head from "next/head";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Router from "next/router";
import { contractAddress, abi } from "../constants/constant";

export default function Home() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

  

  useEffect(() => {
    async function redirectIfRegistered() {
      try {
        const gettingPatientInfo = await contract.getPatientsInfo();
  
        let cleanedArr = [];
        gettingPatientInfo.forEach((itm) => {
          cleanedArr.push(itm.addr);
        });
  
        const finded = cleanedArr.some((addr) => addr == address);
  
        if (finded && isConnected) {
          Router.push("/Docs");
        }
      } catch (err) {
        console.log(err);
      }
    }
    redirectIfRegistered();
  }, [isConnected]);

  function handleContact(e) {
    window.open(e);
  }
  return (
    <div className="overflow-hidden">
      <div
        className={`w-screen h-max flex flex-col items-start justtify-center relative `}
      >
        <Head>
          <title>HealthBase</title>
          <meta name="description" content="Created with ❤ by SHIKHAR" />
          <link rel="icon" href="/images/ico5.png" />
        </Head>

        <Navbar />

        <div className="absolute top-28 left-16 w-72 h-80 bg-[#44f7df] rounded-full  -z-10  filter blur-3xl animate-blob m-4"></div>
        <div className="absolute top-28 left-60 w-72 h-80 bg-[#c6ff77] rounded-full  -z-10 animation-delay-2000 filter blur-3xl animate-blob m-4"></div>
        <div className="absolute top-72 left-56 w-72 h-80 bg-[#fff8b8] rounded-full  -z-10 animation-delay-4000 filter blur-3xl animate-blob m-4"></div>



        <div className="w-10/12 h-10/12 m-auto grid items-center place-content-center sm:grid-cols-2 grid-col-1 gap-8 ">
          <div className="flex items-start justify-center flex-col mt-8">
            <div className="  col-span-2 text-[#333]">
            
             <span className=" font-semibold text-4xl sm:text-5xl lg:text-7xl" >
               HealthBase
              </span>
              <span className="  ">
                <Image
                  src="/images/ico5.png"
                  alt="bg"
                  height={50}
                  width={50}
                  className="w-12 "
                  // layout="responsive"
                />
              </span>
            </div>
            <span className="sm:text-sm text-xs bg-[#00a896] rounded-md my-1.5 p-1 text-white">
              A Decentralized way of managing Medical Data
            </span>
            <span className="text-lg py-3 leading-6 text-[#333] ">
              We know how much precious can a medical data be . HealthBASE
              initiated with a mission of managing and storing your life-saving
              medical data in a <strong>decentralized</strong> way on
              Blockchain.
            </span>
            <span>
              <b className="underline underline-offset-2 decoration-green-500 text-[#444]">
                Connect Wallet
              </b>{" "}
              if already registered
            </span>

            <Link href="/components/Registration">
              <a className=" bg-[#31a196] text-[#e4fffd] text-2xl transition-all duration-300 linear rounded-xl my-8 p-1.5 hover:scale-105 hover:shadow-lg hover:shadow-emerald-300">
                Register here 🖱
              </a>
            </Link>
          </div>
          <div className="w-3/4 sm:4/5 lg:w-5/6  justify-center mx-auto ">

          <Image src="/images/bg2.jfif" alt="bg" height={500} width={400} layout="responsive" />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start ">
        <span className="text-3xl mb-4 font-semibold text-[#555]">
          Powered By
        </span>
        <div className="sm:w-11/12 w-8/12 gap-4 h-32 sm:h-40 flex items-center justify-evenly my-0">
          <Image
            src="/images/alchemy1.jfif"
            alt="bg"
            height={130}
            width={160}
            
          />
          <Image src="/images/ipfs.png" alt="bg" height={130} width={280} />
          <Image
            src="/images/web3storage.png"
            alt="bg"
            height={130}
            width={130}
          />
        </div>
        <span className="sm:text-6xl text-3xl mb-4  tracking-wider font-semibold text-[#222] sm:mt-20 mt-8 text-center">
          🤔 Why HealthBase ?
        </span>
        <div className="grid grid-cols-2 sm:w-1/2 w-10/12 h-max items-center mt-8">
          <div className="m-auto">
            <Image src="/images/easy.png" alt="bg" height={100} width={100} />
          </div>
          <div className="flex items-center justify-center gap-2 flex-col">
            <span className="text-xl text-[#333] font-semibold">
              Easy To Use
            </span>
            <span className="text-md text-[#444] text-center">
              The website is super easy you just have to Register at the First
              Time thereafter just Connect wallet
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-col mt-12">
            <span className="text-xl text-[#333] font-semibold">
              Secured on Blockchain
            </span>
            <span className="text-md text-[#444] text-center">
              HealthBase is secured with the leading technology of blockchain
              that makes it reliable for log term
            </span>
          </div>
          <div className="m-auto">
            <Image src="/images/secure.png" alt="bg" height={100} width={100} />
          </div>
          <div className="m-auto mt-12">
            <Image
              src="/images/unlimited.png"
              alt="bg"
              height={100}
              width={100}
            />
          </div>
          <div className="flex items-center justify-center gap-2 flex-col mt-12">
            <span className="text-xl text-[#333] font-semibold">
              Store Unlimited Files
            </span>
            <span className="text-md text-[#444] text-center">
              You can store as many files as you want. We kow how much important
              your data Is.
            </span>
          </div>
        </div>
        <span className="mt-12 text-2xl text-[#444]">
          🍀Because we value Life🍀
        </span>
        <div className=" flex flex-col items-center mt-20 mb-12 text-[#081c15]">
          <span className="text-4xl">Get Started!</span>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <Link href="/components/Registration">
              <a className=" bg-[#c7f9cc] text-[#081c15] font-semibold text-xl transition-all duration-300 linear rounded-xl my-8 p-1.5 hover:scale-105 hover:shadow-sm hover:shadow-[#9edab0]">
                Register here 🖱
              </a>
            </Link>
            <ConnectButton label="Connect Wallet🦊" />
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#0c413b] h-36 flex flex-col items-center justify-center text-white">
        <span className="text-sm my-1">Made with ❤ by SHIKHAR</span>
        <span className="text-lg mb-3">Contact Me📡</span>
        <div className="flex items-center justify-center gap-6">
          <div onClick={() => handleContact("https://twitter.com/shikkhar_")}>
            <Image
              className="cursor-pointer"
              src="/images/twitter.png"
              alt="bg"
              height={40}
              width={40}
            />
          </div>
          <div onClick={() => handleContact("https://github.com/shikhar360")}>
            <Image
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
            <Image
              className="cursor-pointer"
              src="/images/linkin.png"
              alt="bg"
              height={40}
              width={40}
            />
          </div>
        </div>
        <span className="mt-auto py-3 text-[#c7c7c7] text-xs">
          ©2022 HEALTHBASE. ALL COPYRIGHTS RESERVED
        </span>
      </footer>
    </div>
  );
}
