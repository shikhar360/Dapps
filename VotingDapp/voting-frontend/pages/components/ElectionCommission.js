import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { contractAddress, abi } from "../../constants/constants";
import { ethers } from "ethers";

export default function ElectionCommission() {
  const [form, setForm] = useState({
    name: "",
    image: "",
  });
  const [del, setDel] = useState();
  const [loading, setLoading] = useState(false);

  function handleDelete(e) {
    setDel(e.target.value);
  }

  function handleForm(e) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const { active, activate, deactivate, account, library, connector, error } =
    useWeb3React();
  //-------------------------------------------------------------------------------------
  // CONTRACT INTERACTION

  async function addParticipants(val) {
    try {
      if (val.name && val.image && active) {
        const signer = await library.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const addParticipantsTx = await contract.addCandidate(
          val.name,
          val.image
        );
        setLoading(true);
        await addParticipantsTx.wait();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function disqualify(val) {
    try {
      if (val && active) {
        const signer = await library.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const deleteTx = await contract.disqualifyCandidate(val - 1);
        setLoading(true);
        await deleteTx.wait();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(val - 1);
  }

  //-------------------------------------------------------------------------------------
  return (
    <div
      className={`h-screen w-screen bg-[#f6fff8]  flex flex-col   items-center  justify-start relative `}
    >
      {loading && (
        <div className=" flex justify-center items-center h-full w-full bg-black/25 absolute ">
          <div
            className={`animate-spin rounded-full h-24 w-24 border-b-8   border-black `}
          ></div>
        </div>
      )}
      <div
        className={` flex items-center justify-between bg-[#00f5d4] w-screen text-xl transition-all duration-500 linear px-6 text-white p-2`}
      >
        <div
          className={`flex items-center justify-center gap-1 text-black    `}
        >
          <span> ElectionCommission </span>
        </div>
        <Link href="/">
          <a className="bg-[#ffd60a] p-1 rounded-xl text-black "> Home 💒</a>
        </Link>
      </div>
      <div className="h-screen w-screen flex items-center justify-center gap-16 ">
        <div className="w-80 h-60 text-center border-2 border-[#8338ec] rounded-xl bg-white flex items-center justify-start flex-col gap-4 p-4 ">
          <span className="text-xl">Add Candidate</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="h-8 w-11/12 text-center border-2 rounded-md"
            onChange={handleForm}
          />
          <input
            type="text"
            placeholder="ImageUrl"
            name="image"
            className="h-8 w-11/12 text-center border-2 rounded-md"
            onChange={handleForm}
          />
          <button
            onClick={() => addParticipants(form)}
            className="p-2 mt-auto w-3/6 text-white rounded-xl  bg-red bg-[#80b918]"
          >
            ADD
          </button>
        </div>

        <div className="w-80 h-60 text-center border-2 border-[#8338ec] rounded-xl bg-white flex items-center justify-start flex-col gap-4 p-2">
          <span className="text-xl"> Disqualify Candidate</span>
          <input
            type="number"
            placeholder="Candidate Number"
            className="h-8 w-11/12 text-center border-2 rounded-md"
            onChange={handleDelete}
          />
          <button
            onClick={() => disqualify(del)}
            className="p-2 mb-2 mt-auto w-3/6 text-white rounded-xl  bg-red bg-[#ff0000] "
          >
            Disqualify
          </button>
        </div>
      </div>
    </div>
  );
}
