import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { contractAddress, abi } from "../../constants/constant";

export default function Registration() {
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    location: "",
  });

  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

  console.log(form);
  function handleform(e) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function addingPatientData(val) {
    try {
      if (val.name && val.age && val.sex && val.location) {
        // console.log(val.name, +val.age, val.sex, val.location);
        const sendPatientData = await contract.addPatient(
          val.name,
          +val.age,
          val.sex,
          val.location
        );
        setLoading(true);
        await sendPatientData.wait();
        setLoading(false);
        console.log("data sended");
        Router.push("/Docs");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen bg-[url('/images/bg3.jpg')] bg-cover bg-no-repeat">
      <Head>
        <title>Registration</title>
        <meta name="description" content="Created with ❤ by SHIKHAR" />
        <link rel="icon" href="/images/ico5.png" />
      </Head>
      <div
        className={` flex items-center justify-between  w-screen text-md transition-all duration-500 linear px-4 text-[#03071e] p-1.5 shadow-md bg-[#00a896] `}
      >
        <div
          className={`flex items-center justify-center gap-1   transition-all duration-300 linear rounded-xl `}
        >
          <span className="p-1 text-white sm:text-xl text-sm font-medium">
            HealthBase - Registration
          </span>
          <Image src="/images/ico3.png" width={50} height={38} alt="image" />
        </div>
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <a className=" bg-[#e0fffc] hover:bg-[#b5fff8] transition-all duration-300 linear rounded-xl mx-2 p-1">
              Home
            </a>
          </Link>
          {/* <Link href="/components/About">
          <a className=" bg-[#fee440] hover:bg-[#ffd60a] transition-all duration-300 linear rounded-xl p-1">
            About
          </a>
        </Link> */}
        </div>
      </div>

      {loading && (
        <div className="w-screen flex flex-col  items-center justify-center h-screen top-0 absolute bg-black/50">
          <span className="  p-4  z-10  ">
            <Image
              src="/images/loading.gif"
              width={300}
              height={300}
              alt="image"
              className="rounded-xl"
            />
          </span>
          <span className="bg-[white] text-[#1b4332] p-3 my-2 text-xl font-semibold relative rounded-xl">
            Transaction is being processed
            <span className="animate-ping absolute -top-1 -right-2 inline-flex h-6 w-6 rounded-full bg-[#0aff99] opacity-75"></span>
            <span className="relative inline-flex -top-4 -right-4 rounded-full h-4 w-4 bg-[#0aff99]"></span>
          </span>
        </div>
      )}

      <div className="flex flex-col sm:w-6/12 w-11/12 sm:h-5/6 h-3/4 bg-white/75 rounded-2xl items-start justify-start gap-2 my-auto">
        <span className="text-3xl text-center sm:text-4xl mx-8 mt-4">
          Log-In
        </span>
        <span className="text-base mx-8 text-gray-500 ">
          Enter your credentials to manage your documents
        </span>
        <div
          className={` gap-1 flex w-full flex-col items-start  justify-center mt-4 sm:text-xl text-sm`}
        >
          <span className=" text-lg mx-8">Name</span>
          <input
            type="text"
            onChange={handleform}
            name="name"
            className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
            placeholder="John Ali Singh"
          />
          <span className=" text-lg mx-8">Age</span>
          <input
            type="number"
            onChange={handleform}
            name="age"
            className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
            placeholder="12"
          />
          <span className=" text-lg mx-8">Sex</span>
          <input
            type="text"
            onChange={handleform}
            name="sex"
            className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
            placeholder="Dont write NOT YET"
          />
          <span className=" text-lg mx-8">Location</span>
          <input
            type="text"
            onChange={handleform}
            name="location"
            className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
            placeholder="abc , state , country"
          />
        </div>
        <button
          onClick={() => addingPatientData(form)}
          className="mt-auto m-8 rounded-md py-2 px-4 hover:bg-[#42f0a7] bg-[#0aff99]"
        >
          Register
        </button>
      </div>
    </div>
  );
}
