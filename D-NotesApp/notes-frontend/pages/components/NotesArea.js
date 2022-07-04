import React from "react";
import Image from "next/image";
export default function NotesArea({
  darkMode,
  title,
  description,
  ind,
  deleteit,
}) {
  function HandleDelete(val) {
    deleteit(val);
  }
  return (
    <>
      {title && description && (
        <div
          className={`relative overflow-hidden  w-52 h-48 rounded-xl m-4 p-2 flex flex-col justify-self-center ${
            darkMode ? "bg-white/50" : "bg-amber-300/50"
          }`}
        >
          <div className={` flex items-center justify-between relative`}>
            <span className={`text-base font-bold mb-4`}>{title}</span>
            <div
              className="cursor-pointer absolute mb-8 right-0"
              onClick={() => HandleDelete(ind)}
            >
              <Image
                src="/images/cross.png"
                width={24}
                height={24}
                alt="icon"
              />
            </div>
          </div>
          <span className={`text-sm`}>{description}</span>
        </div>
      )}
    </>
  );
}
//flex flex-col items-starts justify-start self-start justify-self-center
// <span className={`text-xs  absolute right-1 bottom-1`}>
//   {ind + 1}
// </span>
