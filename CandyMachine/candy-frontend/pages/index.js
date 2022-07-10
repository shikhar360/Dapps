import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { contractAddress, abi } from "../constants/constants.js";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [candyAmount, setCandyAmount] = useState("");
  const [candyLeftAmount, setCandyLeftAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [hasConnected, setHasConnected] = useState(false);

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

  useEffect(() => {
    async function candyLeft() {
      try {
        const provider = library;
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let candyleftTx = await contract.getCandyBalance();
        console.log(candyleftTx.toString());
        setCandyLeftAmount(candyleftTx.toString());
        howMuchPurchased(account);
      } catch (err) {
        console.log(err);
      }
    }

    candyLeft();
  }, [hasConnected]);

  const injected = new InjectedConnector({
    supportedChainIds: [4],
  });

  async function connect() {
    try {
      await activate(injected);
      setHasConnected(true);
    } catch (err) {
      console.log(err);
    }
  }
  async function disconnect() {
    try {
      deactivate(injected);
      setHasConnected(false);
    } catch (err) {
      console.log(err);
    }
  }

  //------------------------------------------------------------------------------------------------
  //Contract Interaction

  async function buyCandy(amount) {
    //signer or provider and
    //contract
    try {
      const signer = await library.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      //setting the minimum value of of each candy equals to ;;
      const value = amount * 0.01;

      //for billing value is  calculated and pushed as a recipt ( value: utils.parseEther(value.toString()),)
      const buyCandyTx = await contract.buyCandy(amount, {
        value: utils.parseEther(value.toString()),
      });
      setLoading(true);
      await buyCandyTx.wait(); // waiting for transaction to be mined
      setLoading(false);
      candyLeft();
    } catch (err) {
      console.log(err);
    }
  }

  async function candyLeft() {
    try {
      const provider = library;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      let candyleftTx = await contract.getCandyBalance();
      console.log(candyleftTx.toString());
      setCandyLeftAmount(candyleftTx.toString());
      howMuchPurchased(account);
    } catch (err) {
      console.log(err);
    }
  }

  async function howMuchPurchased(acc) {
    try {
      const provider = library;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      let totalPurchasedTx = await contract.totalPurchasedByAddress(acc);
      setTotalAmount(totalPurchasedTx.toString());
    } catch (err) {
      console.log(err);
    }
  }

  //------------------------------------------------------------------------------------------------

  function toggle() {
    setDarkMode(!darkMode);
  }

  function handleAmount(e) {
    setCandyAmount(e.target.value);
  }

  return (
    <div
      className={`w-screen h-screen bg-cover bg-no-repeat transition-all duration-500 linear bg-blur-md flex-col flex items-center justify-start relative ${
        !darkMode
          ? "bg-[url('/images/day1.jpg')] "
          : "bg-[url('/images/night2.jpg')]"
      } `}
    >
      <Head>
        <title>Candy Machine</title>
        <link rel="icon" href="/images/candy.png" />
      </Head>
      <Navbar
        toggle={toggle}
        darkMode={darkMode}
        connect={connect}
        disconnect={disconnect}
        active={active}
      />
      <div
        className={`bg-white/50 h-4/5 w-2/4 flex flex-col items-center justify-center  my-auto rounded-3xl p-6`}
      >
        <span className="text-2xl mt-4 text-center sm:text-4xl">{`${candyLeftAmount} candies left in Machine`}</span>
        <div className=" w-36 h-68 sm:w-40 sm:h-72 sm:my-2">
          <Image
            src="/images/machine.png"
            width={155}
            height={280}
            layout="responsive"
            alt="image"
          />
        </div>
        {loading && (
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
        <span className={`text-lg text-center sm:text-xl`}>
          I want to buy{" "}
          <input
            type="number"
            className=" text-center w-8 rounded-md"
            onChange={handleAmount}
          />{" "}
          number of candy{" "}
          <button
            onClick={() => buyCandy(candyAmount)}
            className={`${
              !darkMode ? "bg-rose-600" : "bg-fuchsia-700"
            } p-1.5 w-16 text-white rounded-md`}
          >
            BUY
          </button>
        </span>
        <span className="text-sm text-center sm:text-md">{`You have purchased total ${totalAmount} candies`}</span>
      </div>
    </div>
  );
}
