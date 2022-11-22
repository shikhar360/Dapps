import React from "react";
import { ContractAddress } from "../constants";
import { useState } from "react";
import { useEffect } from "react";

interface NftData {
  imgUrl: string;
  name: string;
  desc: string;
  opensea: string;
}

export default function AllNFT() {
  const tokens = process.env.NEXT_PUBLIC_TOKEN;
  const [nft, setNft] = useState<NftData[]>([]);

  async function fetchAllNft() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokens}`,
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/nfts/${ContractAddress}?chain=polygon&include=metadata`,
      options
    )
      .then((response) => response.json())
      .then((res) => {
        let data: any = [];
        res.nfts.forEach((nft: any) => {
          data.push({
            imgUrl: nft.cached_file_url,
            name: nft.metadata.name,
            desc: nft.metadata.description,
            opensea: `https://opensea.io/assets/matic/${ContractAddress}/${nft.token_id}`,
          });
        });

        setNft(data);
      });
  }
  console.log(nft);

  useEffect(() => {
    fetchAllNft();
  }, []);

  return (
    <div className="pt-16 min-h-screen  w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-br from-[#ffef9f] to-[#c1fba4] auto-rows-max  px-6 ">
      {nft?.map((nft: NftData, ind: number) => {
        return (
          <div
            key={ind}
            className="bg-white/80 w-11/12 h-5/6 m-4 min-h-max rounded-lg flex flex-col items-center justify-center p-3 pb-4 hover:scale-105 transition-all duration-200 ease-linear hover:shadow-black/20 hover:shadow-lg"
          >
            <img src={nft.imgUrl} alt="nfts" className=" w-2/6 rounded-lg " />
            <h3 className="text-lg">{nft.name.toUpperCase()}</h3>
            <a
              href={nft.opensea}
              className="text-xs text-blue-700 mt-0 float-right "
              target="new"
            >
              <span>
                👀️See-Opensea
                <img src="/images/link.png"  alt="img" width={20} className='inline-flex'/>
              </span>
            </a>
            <p className="text-sm mt-2 text-slate-700 text-center h- overflow-y-scroll scrollbar-hide ">
              {nft.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/*

*/
