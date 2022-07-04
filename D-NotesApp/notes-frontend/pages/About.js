import React from "react";
import Link from "next/link";
export default function About() {
  function open() {
    window.open("https://twitter.com/shikkhar_");
  }
  function open2() {
    window.open("https://github.com/shikhar360/Dapps/tree/main/D-NotesApp");
  }
  return (
    <div
      className={`flex w-screen h-screen  flex-col items-center justify-center bg-cover bg-[url('/images/ab.jpg')]`}
    >
      <div
        className={`flex flex-col items-center justify-center w-3/5 h-3/5 bg-white/50 rounded-3xl `}
      >
        <h1 className="text-4xl mb-8">Hello Everyone 😀👋</h1>
        <p className="text-lg  text-center px-4 ">
          My name is Shikhar , M from Varanasi , Uttar Pradesh , India. Hope you
          liked my Decentralized Notes App . Make sure you are on 🛑RINKEBY
          NETWORK🛑 In-case the App is not working .
        </p>
        <p className="text-lg  text-center p-8 mb-8">
          You can follow me on{" "}
          <span
            className="underline cursor-pointer bg-sky-400 rounded-lg p-1 underline-offset-4"
            onClick={open}
          >
            Twitter🤚
          </span>{" "}
          . If you want to see the codes of this project then you can{" "}
          <span
            className="underline cursor-pointer bg-gray-900 rounded-lg p-1 text-white underline-offset-4"
            onClick={open2}
          >
            Click Here🚩
          </span>{" "}
        </p>
        <Link href="/">
          <a className="py-2 px-4 bg-lime-400 rounded-lg font-bold">
            Back to Home💒
          </a>
        </Link>
      </div>
    </div>
  );
}
