import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar({
  toggle,
  darkMode,
  runConnectWallet,
  currentAccount,
}) {
  return (
    <div
      className={`w-screen text-xl ${
        darkMode ? "bg-teal-600" : "bg-fuchsia-600"
      } py-2 px-4 flex  items-center justify-between gap-2 text-white ease-linear duration-300`}
    >
      <div className={`flex  items-center justify-between gap-2.5 `}>
        <Image src="/ico.png" width="40" height="30" alt="icon" />
        Decentralized Notes App
      </div>
      <div className={`flex  items-center justify-between gap-2.5 `}>
        {currentAccount ? (
          <span
            className={` m-1 px-2 py-1 bg-green-300 rounded-md text-white `}
          >
            Wallet is Connected😋
          </span>
        ) : (
          <button
            onClick={runConnectWallet}
            className={` m-1 px-2 py-1 bg-amber-300 rounded-md text-white `}
          >
            Connect Wallet 😎
          </button>
        )}
        <Link href="/About">
          <a>About</a>
        </Link>

        <div
          onClick={toggle}
          className={`p-1 bg-white rounded-lg cursor-pointer`}
        >
          {darkMode ? (
            <Image src="/images/sun.png" width="24" height="24" alt="icon" />
          ) : (
            <Image src="/images/moon.png" width="24" height="24" alt="icon" />
          )}
        </div>
      </div>
    </div>
  );
}
