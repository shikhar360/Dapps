import React, { ChangeEvent, useState, useRef } from "react";
import { Formik } from "formik";
import fs from "fs";
import { ContractAddress } from "../constants/index";

interface MyVals {
  file: Blob | string;
  name: string;
  description: string;
  contract: string;
}

export default function Mint() {
  const formEL = useRef<HTMLFormElement>(null!);
  const tokens = process.env.NEXT_PUBLIC_TOKEN;
  const [link, setLink] = useState<string>(
    `https://opensea.io/assets/matic/${ContractAddress}`
  );
 
  const [allInfo, setAllInfo] = useState<MyVals>({
    file: "",
    name: "",
    description: "",
    contract: "",
  });

  async function minting(val: MyVals) {
    try {
      console.log(val.file);

      const form = new FormData();
      form.append("file", val.file);

      const options = {
        method: "POST",
        headers: {
          Authorization: `${tokens}`,
        },

        body: form,
      };

      fetch("https://api.nftport.xyz/v0/files", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.ipfs_url);
          metadating(
            response.ipfs_url,
            val.name,
            val.description,
            val.contract
          );
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function metadating(
    url: string,
    name: string,
    desc: string,
    con: string
  ) {
    try {
      console.log(url, name, desc, con);

      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokens}`,
        },
        body: `{"name":"${name}","description":"${desc}","file_url":"${url}"}`,
      };

      await fetch("https://api.nftport.xyz/v0/metadata", options)
        .then((response) => response.json())
        .then((response) => {
          cutomiseMinting(con, response.metadata_uri);
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function cutomiseMinting(con: string, url: string) {
    console.log(con, url);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokens}`
      },
      body: `{"chain":"polygon","contract_address":"${ContractAddress}","metadata_uri":"${url}","mint_to_address":"${con}"}`
    };

    await fetch('https://api.nftport.xyz/v0/mints/customizable', options)
      .then(response => response.json())
      .then(response => console.log(response , link))
  }

  function handleInput(e: any) {
    setAllInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleBlob(e: any) {
   
    setAllInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  }

  return (
    <div className='bg-[url("/images/2.jpg")] min-h-screen w-full bg-cover bg-no-repeat flex  items-center justify-center '>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          formEL.current.reset();
          minting(allInfo);
        }}
        className="flex w-11/12 md:w-2/3 rounded-lg bg-white/75 backdrop-blur-sm flex-col items-start p-3 justify-center"
        ref={formEL}
      >
        <h5 className="md:text-2xl text-xl mx-auto text-center w-full">
          Fill Your Details
        </h5>
        <h6 className="mt-2">File</h6>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleBlob}
          className="file:bg-gray-600 file:border-none file:p-2 file:py-1 file:shadow-md file:shadow-gray-500 file:text-white file:px-2 file:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl text-sm my-2"
        />

        <h6>Name</h6>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name of NFT"
          onChange={handleInput}
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2"
        />
        <h6>Description</h6>
        <input
          placeholder="Description of NFT"
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2"
          type="text"
          id="discription"
          name="description"
          onChange={handleInput}
        />
        <h6>Mint To...</h6>
        <input
          placeholder="Address you want to Mint"
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2 "
          type="text"
          id="contract"
          name="contract"
          onChange={handleInput}
        />
        <button
          className="bg-gray-600 shadow-md shadow-gray-500 rounded-lg py-0.5 px-2 text-white transition-all duration-300 ease-linear mt-3 hover:bg-gray-400 w-full mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
