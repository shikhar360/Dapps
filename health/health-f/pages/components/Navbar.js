import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import Router from "next/router";
import { contractAddress, abi } from "./../../constants/constant";

export default function Navbar({}) {
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

  return (
    <div
      className={` flex items-center justify-between  w-screen text-md transition-all duration-500 linear px-4 text-[#03071e] p-1.5 shadow-md bg-[#00a896] `}
    >
      <div
        className={`flex items-center justify-start sm:gap-1   transition-all duration-300 linear rounded-xl `}
      >
        <span className="p-1  text-white sm:text-xl text-sm font-medium">
          HealthBase
        </span>
        <span className=" m-0">
        <Image src="/images/ico3.png" width={35} height={38} alt="image" />
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-4 w-3/6 sm:w-max ">
        <div className="text-xs sm:text-base text-center  ">

        <ConnectButton label="Connect Wallet"  />
        </div>

        <Link href="/components/Registration">
          <a className=" bg-[#c7f9cc] hover:bg-[#b5fff8] text-[#081c15] font-bold text-sm sm:text-base transition-all duration-300 linear rounded-xl sm:mx-2 mx-1 sm:p-1.5 p-1">
            Registration
          </a>
        </Link>
        {/* <Link href="/Docs">
          <a className=" bg-[#e0fffc] hover:bg-[#b5fff8] transition-all duration-300 linear rounded-xl p-1">
            Your Docs
          </a>
        </Link> */}
      </div>
    </div>
  );
}
