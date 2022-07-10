import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { abi, contractAddress } from "./../constants/constants";
import { ethers, utils } from "ethers";

export default function OwnerSection() {
  const [earnings, setEarnings] = useState("");
  const [restockAmount, setRestockAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading2, setLoading2] = useState(false);
  const {
    active,
    activate,
    deactivate,
    account,
    library,
    connector,
    error,
    chainId,
  } = useWeb3React();

  //------------------------------------------------------------------------------------------
  //Contract Interaction

  async function earningsFunc() {
    const provider = library;
    const contract = new ethers.Contract(contractAddress, abi, provider);

    let earningsTx = await contract.getEarnings();
    setEarnings(utils.formatEther(earningsTx));
  }

  async function restocking(val) {
    try {
      const signer = library.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const restockTx = await contract.restock(val);
      setLoading2(true);
      await restockTx.wait();
      setLoading2(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function withdrawing(val) {
    try {
      if (val > earnings) {
        alert("Withdrawing more than Earnings💵");
      } else {
        const signer = library.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const withdrawTx = await contract.withdrawFunds(utils.parseEther(val));
        setLoading2(true);
        await withdrawTx.wait();
        setLoading2(false);
        earningsFunc();
      }
    } catch (err) {
      console.log(err);
    }
  }
  //------------------------------------------------------------------------------------------
  if (active) {
    earningsFunc();
  }

  function handleRestock(e) {
    setRestockAmount(e.target.value);
  }
  function handleWithdraw(e) {
    setWithdrawAmount(e.target.value);
  }
  return (
    <div className=" h-screen w-screen bg-cover bg-no-repeat flex flex-col items-center relative justify-start bg-[url('/images/ab.jpg')] ">
      <div
        className={` flex items-center justify-between bg-fuchsia-700 w-screen text-xl transition-all duration-500 linear px-6 text-white p-1`}
      >
        <div className={`flex items-center justify-center gap-1s `}>
          <span>{`Candy Machine : Owner's Section`}</span>
          <Image src="/images/candy.png" width={50} height={48} alt="image" />
        </div>
        <Link href="/">
          <a> Back to Home 💒</a>
        </Link>
      </div>
      {loading2 && (
        <div className="w-screen flex  items-center justify-center h-screen top-0 absolute bg-white/25">
          <span className=" animate-bounce  p-4  z-10  ">
            <Image
              src="/images/candy.png"
              width={150}
              height={150}
              alt="image"
            />
          </span>

          <span className=" animate-bounce  p-4  z-10 delay-1000 ">
            <Image
              src="/images/candy1.png"
              width={200}
              height={200}
              alt="image"
            />
          </span>
        </div>
      )}
      <div className="flex flex-col w-3/5 h-3/5 bg-white/75 rounded-2xl items-center justify-center gap-4 my-auto">
        <span className="text-2xl text-center sm:text-3xl sm:mb-2">
          You have EARNED TOTAL
        </span>
        <span className="text-3xl text-center sm:text-4xl mb-8">{`${earnings} ETHERS`}</span>
        <div
          className={`gap-2 flex  items-center justify-center mb-4 sm:text-xl text-sm`}
        >
          {" "}
          <input
            type="number"
            onChange={handleWithdraw}
            className="text-center rounded-xl"
            placeholder="Withdrawing....."
          />
          <button
            onClick={() => withdrawing(withdrawAmount)}
            className={` p-1.5  text-white rounded-md bg-fuchsia-700`}
          >
            Withdraw Funds
          </button>
        </div>
        <div
          className={`gap-2 flex  items-center justify-center sm:text-xl text-sm `}
        >
          {" "}
          <input
            type="number"
            onChange={handleRestock}
            className="text-center rounded-xl"
            placeholder="Re-Stocking..."
          />
          <button
            onClick={() => restocking(restockAmount)}
            className={` p-1.5  text-white rounded-md bg-fuchsia-700`}
          >
            Restock Candies
          </button>
        </div>
      </div>
    </div>
  );
}
