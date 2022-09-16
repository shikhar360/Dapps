import {
  ConnectWallet,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
// import type {NextPage} from "next"
import React, { useState } from "react";

export default function Home() {
  const { contract } = useContract(
    "0xAa3373EE5c00aA1d75cB3Aa8Cd9F0026C3D0bc77"
  );

  const { data, isLoading } = useContractRead(contract, "getMood");

  const { mutateAsync: setMood } = useContractWrite(contract, "setMood");

  // const { data: getMood } = useContractRead(contract, "getMood");

  const [moodIs, setMoodIs] = useState("");
  const [input, setInput] = useState();

  async function setMoodTx(val) {
    try {
      console.log(val);
      const moodTx = await setMood([val]);

      console.log("Mood setted successfully");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(data);
  async function gettingMood() {
    try {
      ~(
        // const getMoodTx = await data();
        setMoodIs(data)
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="container">
      <h1>Hello THIRDWEB</h1>
      <h2>My mood is {moodIs}</h2>

      <input type="text" onChange={handleInput} />
      <button className="btn" onClick={() => setMoodTx(`${input}`)}>
        Set Mood
      </button>
      <button
        style={{ marginBottom: "30px" }}
        className=""
        onClick={gettingMood}
      >
        GetMood
      </button>
      <ConnectWallet accentColor="blue" colorMode="light" />
    </div>
  );
}
