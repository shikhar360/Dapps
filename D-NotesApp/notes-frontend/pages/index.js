import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AddNotes from "./components/AddNotes";
import Navbar from "./components/Navbar";
import { ethers } from "ethers";
import { contractAddress, abi } from "../constants/constants.js";

import React from "react";
import NotesArea from "./components/NotesArea";


export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notes, setNotes] = React.useState([
    // {
    //   title: "Title will be Here",
    //   description:
    //     " Some random description about what should happen this is purely random so dont take it serious i have done that becaus em lazy to copy lorem ipsum ",
    // },
  ]);
  

  const [currentAccount, setCurrentAccount] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [tolNotes, setTolNotes] = React.useState(0);
  const [actual, setActual] = React.useState(0);

  console.log(notes);

  //-----------------------------------------------------------------------------------------------
  // Normal approach--- to check if wallet is already logged in or not??
  // If its not connected make a connectwallet button???(both will be async functions)

  //! checking if the wallet is present or not

  React.useEffect(() => {
    //executing the checking at the time of load

    async function checkingWallet() {
      // this will be run automatically at the time of page load
      //authorization process // checking login
      try {
        const { ethereum } = window; //before auth please check if wallet is present or not

        if (!ethereum) {
          alert("Install Metamask Serrrr...🙏");
        } else {
          console.log("Yay😻 you have metamask installed");
        }

        const accounts = await ethereum.request({ method: "eth_accounts" }); //if already logged in then set the account

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log(`Your authorize account is ${account}`);
          setCurrentAccount(account);
          allNotes();
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkingWallet();
  }, [currentAccount]);

  //! If you are not already loged in then use a connect wallet button
  async function connectWallet() {
    const { ethereum } = window;
    if (ethereum) {
      const accs = await ethereum.request({ method: "eth_requestAccounts" });

      // console.log("Connected Bhai", accs[0]);
      setCurrentAccount(accs[0]);
    } else {
      alert("Please get Metamask Ser...");
    }
  }

  //-----------------------------------------------------------------------------------------------

  function runConnectWallet() {
    connectWallet();
  }

  function toggle() {
    setDarkMode(!darkMode);
  }

  /*
For Starting any function from contract we have to first made the function async then to interact with the 
contract we need 3  things 
    1. Provider   ,  2. Signer(if function is planning to write something on blockchain) , 3. Contract
    
    In contract(3rd) we need to define 3 things :::
    1.ContractAddress ,  2.Contract's Abi  , 3. Provider or Signer (acc. to need)
    
*/

  async function gettingNotes(val, val2) {
    //firstwe are setting here then in next func we will be  getting the notes dont get confuse by the name

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const NoteTx = await contract.gettingNotes(val, val2); //start transaction
        console.log("Mining has started ", NoteTx.hash);
        setLoading(true);
        await NoteTx.wait(); // wait for transaction to be mined
        setLoading(false);
        allNotes(); //*allNotes is called Here
      } else {
        console.log("Contract Object does not Exists");
      }
    } catch (err) {
      console.log(err);
    }

    // setNotes((prev) => {               //depricated from web2
    //   return [...prev, val];
    // });
  }

  async function allNotes() {
    // here we are getting all the notes , we will call this function when we have setted the notes
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let noteArr;
        noteArr = await contract.getNotesArr(); //here we are getting the array
        console.log(noteArr);
        let notesCleaned = []; // here we are cleaning it because lot of waste in it
        noteArr.forEach((note) => {
          notesCleaned.push({
            title: note.title,
            description: note.description,
          });
        });
        setNotes(notesCleaned);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteit(val) {
    // here we are already getting the index value
    console.log(val);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const delTx = await contract.deleteit(val);
        setLoading(true);
        await delTx.wait();
        setLoading(false);
        allNotes();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function totalNotesNo() {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        let totalNoOfNotes;
        totalNoOfNotes = await contract.getTotalNotes();
        setTolNotes(totalNoOfNotes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function actualTotal() {
    let ar = [];
    notes.map((val) => {
      if (val.title && val.description) {
        ar.push({ val });
      }
    });
    setActual(ar.length);
  }

  
  return (
    <div
      className={`
      ${
        styles.container
      } w-full  h-full ease-linear duration-300 bg-cover relative 
      ${
        !darkMode
          ? `bg-[url('/images/day1.jpg')]`
          : `bg-[url(/images/night3.jpg)]`
      }
           `}
    >
      <Head>
        <title>Decentralised Notes App</title>
        <link rel="icon" href="/ico.png" />
      </Head>
      <Navbar
        toggle={toggle}
        darkMode={darkMode}
        runConnectWallet={runConnectWallet}
        currentAccount={currentAccount}
      />

      {loading && (
        <div className=" flex justify-center items-center h-full w-full bg-black/25 absolute ">
          <div
            className={`animate-spin rounded-full h-24 w-24 border-b-8   ${
              darkMode ? "border-teal-600" : "border-fuchsia-600"
            } `}
          ></div>
        </div>
      )}

      <div className={`${styles.griding} w-full h-auto`}>
        <AddNotes
          darkMode={darkMode}
          gettingNotes={gettingNotes}
         
          totalNotesNo={totalNotesNo}
          total={tolNotes}
          actual={actual}
          actualfunction={actualTotal}
        />

        <div
          className={`  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-screen sm:w-full h-screen  self-center overflow-y-scroll p-2 m-0 ml-4 `}
        >
          {notes[0] &&
            notes.map((itm, ind) => {
              return (
                <>
                  {itm.title && itm.description && (
                    <NotesArea
                      key={ind}
                      {...itm}
                      ind={ind}
                      darkMode={darkMode}
                      deleteit={deleteit}
                    />
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// {updating ? <Update darkMode={darkMode} {...updating} /> : null}
