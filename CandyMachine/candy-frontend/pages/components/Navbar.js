import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({
  darkMode,
  toggle,
  connect,
  active,
  disconnect,
}) {
  return (
    <div
      className={` flex items-center justify-between  w-screen text-xl transition-all duration-500 linear ${
        !darkMode ? "bg-rose-600" : "bg-fuchsia-700"
      } text-white p-1`}
    >
      <div className={`flex items-center justify-center gap-1s `}>
        <span>Candy Machine</span>
        <Image src="/images/candy1.png" width={50} height={48} alt="image" />
      </div>
      <div className={`flex items-center justify-center gap-6`}>
        {active ? (
          <button
            onClick={disconnect}
            className={` p-1.5  text-white rounded-md bg-green-500`}
          >
            Disconnect Wallet 😢
          </button>
        ) : (
          <button
            onClick={connect}
            className={` p-1.5  text-white rounded-md bg-amber-500`}
          >
            Connect Wallet 🤚
          </button>
        )}
        <Link href="/OwnerSection">
          <a> Owner Section</a>
        </Link>
        <Link href="/components/About">
          <a> About</a>
        </Link>
        <div
          onClick={toggle}
          className={`flex items-center justify-center p-1.5 m-1 rounded-2xl bg-white`}
        >
          {darkMode ? (
            <Image src="/images/sun.png" width={24} height={24} alt="image" />
          ) : (
            <Image src="/images/moon.png" width={24} height={24} alt="image" />
          )}
        </div>
      </div>
    </div>
  );
}
