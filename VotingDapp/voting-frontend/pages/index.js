import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { contractAddress, abi } from "../constants/constants.js";
import { ethers } from "ethers";

export default function Home() {
  const [candidates, setCandidates] = useState([
    // {
    //   image: `https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/344/external-power-smartphone-application-xnimrodx-lineal-color-xnimrodx.png`,
    //   name: "Abbas",
    // },
  ]);

  const [voterList, setVoterList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [votedTo, setVotedTo] = useState("");
  const [voterListArr, setVoterListArr] = useState("");
  const { active, activate, deactivate, account, library, connector, error } =
    useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [5],
  });

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate(injected);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    gettingCandidates();
    gettingVotedTo();
    gettingVoterList();
  }, [active]);

  //------------------------------------------------------------------------------------------------
  //CONTRACT INTERACTION

  async function handleVote(val) {
    try {
      console.log(val);
      if (active) {
        const signer = await library.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const voteTx = await contract.vote(val);
        setLoading(true);
        await voteTx.wait();
        setLoading(false);
        gettingCandidates();
        gettingVotedTo();
        handlingEvents(); // only console.log is working only on events
        gettingVoterList();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function gettingCandidates() {
    try {
      if (active) {
        const provider = library;
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let candidateArr = [];

        let gettingArrTx = await contract.getCandidate();

        gettingArrTx.forEach((itm) => {
          candidateArr.push({
            name: itm.name,
            image: itm.electionSymbol,
            voteCountNumber: itm.voteCount.toString(),
          });
        });

        setCandidates(candidateArr);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function gettingVotedTo() {
    try {
      if (active) {
        const provider = library;
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let getVotesToTx = await contract.getVotedTo(account);

        setVotedTo(getVotesToTx);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handlingEvents() {
    try {
      const provider = library;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      let eventTx = await contract.on(
        "VotedAddress",
        (from, to, amount, event) => {
          console.log("events.........................................");
          console.log({ from, to, amount, event });
          console.log(from);
        }
      );
      console.log(eventTx);
    } catch (err) {
      console.log(err);
    }
  }

  async function gettingVoterList() {
    try {
      if (active) {
        const provider = library;
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let voterArr = [];

        let gettingVoterTx = await contract.getVoterList();

        gettingVoterTx.forEach((itm) => {
          voterArr.push(itm);
        });

        setVoterListArr(voterArr);
      }
    } catch (err) {
      console.log(err);
    }
  }
  //------------------------------------------------------------------------------------------------
  return (
    <div
      className={`h-screen w-screen  flex flex-col items-center bg-[#f6fff8]  justify-start relative `}
    >
      <Head>
        <title>Voting Dapp</title>
        <link rel="icon" href="/images/ico.png" />
      </Head>
      <Navbar
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        active={active}
      />
      {loading && (
        <div className=" flex justify-center items-center h-full w-full bg-black/25 absolute z-10 ">
          <div
            className={`animate-spin rounded-full h-24 w-24 border-b-8   border-black `}
          ></div>
        </div>
      )}
      <span className="text-4xl bg-[#ff0000] text-white  rounded-xl m-8 p-2">
        {votedTo
          ? `Thanks for voting ${votedTo}`
          : " Click on Your favourite Candidate to Vote"}
      </span>
      <div className=" h-max w-max flex items-start justify-center gap-8 mt-8">
        {candidates &&
          candidates.map((cand, ind) => {
            return (
              <div
                key={ind}
                onClick={() => handleVote(ind)}
                className=" flex rounded-2xl border-8 border-[#7400b8]  hover:shadow-[#e0aaff]  items-center justify-center cursor-pointer hover:shadow-xl bg-white hover:scale-105 transition-all duration-300 w-44 h-40 relative "
              >
                <span className="text-2xl ">{cand.name}</span>
                {cand.image && (
                  <div
                    className={`absolute  rounded-full border-4 border-rose-500 bg-white p-2 ${styles.icons}`}
                  >
                    <Image
                      src={cand.image}
                      width={60}
                      height={60}
                      alt="image"
                    />
                  </div>
                )}
                <div
                  className={`absolute  rounded-xl text-lg text-center border-4 border-green-500 bg-white p-2 ${styles.votecount}`}
                >
                  {cand.voteCountNumber}
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => setVoterList(!voterList)}
        className="mt-16 p-2 bg-[#ff006e] text-white text-lg rounded-lg "
      >
        {`${voterList ? " Hide 👻" : "Show 👀"} Voter's List`}
      </button>
      {voterList && (
        <div className=" mt-4 p-2 flex flex-col items-center justify-start w-90 h-38 overflow-scroll gap-4">
          {voterListArr.map((itm, ind) => {
            return (
              <span key={ind} className=" bg-amber-400 p-1 px-4 rounded-md">
                {itm}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
