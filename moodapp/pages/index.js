import {
  ConnectWallet,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import React, { useState } from "react";

export default function Home() {
  const { contract } = useContract(
    "0xF31DF4A816F8B5855452fAfb65057ef4D598899F"
  );

  const { mutateAsync: setMood } = useContractWrite(contract, "setMood");
  const { data: moodtx } = useContractRead(contract, "getMood");

  const [moodIs, setMoodIs] = useState("");
  const [input, setInput] = useState();

  async function setMoodTx(val) {
    try {
      console.log(val);
      const moodTx = await setMood(val.toString());

      console.log("Mood setted successfully");
    } catch (err) {
      console.log(err);
    }
  }

  async function gettingMood() {
    try {
      const getMoodTx = await moodtx();
      setMoodIs(getMoodTx);
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
      <button className="btn" onClick={() => setMoodTx(input.toString())}>
        Set Mood
      </button>
      <button className="" onClick={gettingMood}>
        GetMood
      </button>
      <ConnectWallet accentColor="#f213a4" colorMode="light" />
    </div>
  );
}
