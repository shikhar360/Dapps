import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Navbar({ disconnectWallet, connectWallet, active }) {
  return (
    <div
      className={` flex items-center justify-between  w-screen text-xl transition-all duration-500 linear px-6 text-[#03071e] p-2 shadow-md bg-[#00f5d4] `}
    >
      <div
        className={`flex items-center justify-center gap-1   transition-all duration-300 linear rounded-xl `}
      >
        <span className="p-1 ">Voting DApp 🙋‍♂️👆 </span>
        {/* <Image src="" width={50} height={48} alt="image" /> */}
      </div>
      <div className="flex items-center justify-center gap-6">
        {active ? (
          <button
            onClick={disconnectWallet}
            className={` p-1.5  text-white rounded-md bg-[#f94144]`}
          >
            Disconnect Wallet😢
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className={` p-1.5  text-white rounded-md bg-[#8ac926] `}
          >
            Connect Wallet😋
          </button>
        )}
        <Link href="/components/ElectionCommission">
          <a className=" bg-[#fee440] hover:bg-[#ffd60a] transition-all duration-300 linear rounded-xl mx-2 p-1">
            {" "}
            Election Commission
          </a>
        </Link>
        <Link href="/components/About">
          <a className=" bg-[#fee440] hover:bg-[#ffd60a] transition-all duration-300 linear rounded-xl p-1">
            About
          </a>
        </Link>
      </div>
    </div>
  );
}
