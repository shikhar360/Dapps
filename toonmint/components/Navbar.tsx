import React, { useState, useRef, useEffect } from "react";
import useWindowDimensions from "./utils/windowDimension";

export default function Navbar() {
  const menu = useRef<HTMLDivElement>(null!);
  const { height, width } = useWindowDimensions();
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleMenu(): JSX.Element | undefined {
    if (width < 768) {
      return (
        <div
          className="w-full flex items-start justify-center"
          onClick={() => setIsActive(!isActive)}
        >
          {!isActive ? (
            <img src="/images/menu.png" alt="menu" width={"42"} />
          ) : (
            <img src="/images/close.png" alt="menu" width={"42"} />
          )}
        </div>
      );
    }
  }

  console.log(width);
  return (
    <div className="w-full m-0 p-0 bg-amber-500 text-white flex items-start justify-center">
      <div className=" flex items-center h-full py-2 px-4 justify-center ">
        <span>LOGo</span>
      </div>
      <div
        ref={menu}
        className={`h-full py-2 ml-auto flex items-center gap-4 px-4 justify-end  flex-col md:flex-row transition-all duration-300 ease-linear`}
      >
        <div>{handleMenu()}</div>

        {isActive || width > 768 ? (
          <>
            <span>Home </span>
            <span>mint</span>
            <span>AllNFT</span>
            <span>Connect wallet</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

// <div className="md:border m-2 md:w-11/12 w-full rounded-3xl  flex items-start justify-center  bg-white/70 z-30">
//   <div className="cursor-pointer w-full h-11 md:w-2/6 flex items-center justify-center">
//     <span className=" text-center "> Logo</span>
//   </div>

//   <div className="w-2/3 flex md:items-end items-center flex-col justify-center gap-4 md:justify-end">

//     <div className="md:hidden  w-full flex items-center justify-center  " onClick={() => setMenu(!menu)}>
//       {menu ? (
//         <img src="/images/menu.png" alt="menu" width={"42"} />
//       ) : (
//         <img src="/images/close.png" alt="menu" width={"42"} />
//       )}
//     </div>
//     <div
//       className={`flex items-center justify-center md:justify-end gap-12 md:flex-row flex-col w-full md:w-2/3  md:pr-20 ${
//         menu && " hidden"
//       }`}
//     >
//       <span className="hover:bg-amber-500 duration-300 ease-linear p-2 rounded-xl cursor-pointer ">
//         Home
//       </span>
//       <span className="hover:bg-amber-500 duration-300 ease-linear p-2 rounded-xl cursor-pointer">
//         NFT Place
//       </span>
//       <span className="hover:bg-amber-500 duration-300 ease-linear p-2 rounded-xl cursor-pointer">
//         Mint
//       </span>

//       <span>Connect Wallet</span>
//     </div>
//   </div>
// </div>
