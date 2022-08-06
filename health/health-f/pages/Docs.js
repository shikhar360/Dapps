import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { contractAddress, abi } from "../constants/constant";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { StoreData } from "../constants/StoreData";

export default function Docs() {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [docs, setDocs] = useState([]);
  const { address, isConnected } = useAccount();
  // console.log(info);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

  const [updateForm, setUpdateForm] = useState({
    name: "",
    age: "",
    sex: "",
    location: "",
  });

  function handleUpdate(e) {
    setUpdateForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // console.log(updateForm);
  async function updateSelf(val) {
    try {
      if (val.name && val.age && val.sex && val.location) {
        const updating = await contract.updatePatient(
          val.name,
          val.age,
          val.sex,
          val.location
        );
        setLoading(true);
        await updating.wait();
        setLoading(false);
        setShowModal(false);
        setShow(true);
        getselfInfo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  useEffect(() => {
    async function getselfInfo() {
      try {
        const getinfo = await contract.selfInfo();
  
        setInfo({
          name: getinfo.name,
          age: getinfo.age.toString(),
          sex: getinfo.sex,
          location: getinfo.location,
          id: getinfo.id.toString(),
          addr: getinfo.addr,
          docs: getinfo.docs,
        });
  
       getDocs();
      } catch (err) {
        console.log(err);
      }
    }
    getselfInfo();
  }, [isConnected]);

  const [upload, setUpload] = useState({
    docName: "",
    fileBlob: "",
  });

  function handleDocNameUpload(e) {
    setUpload((prev) => {
      return {
        ...prev,
        docName: e.target.value,
      };
    });
  }

  function handleFileUpload(e) {
    setUpload((prev) => {
      return {
        ...prev,
        fileBlob: e.target.files[0],
      };
    });
  }
  // console.log(upload);

  async function sendToIpfs(val) {
    console.log(val.fileBlob);
    if (val.fileBlob && val.docName) {
      console.log("Uploading files ...");
      alert("File Uploading , Wait for Transaction");
      const cid = await StoreData(val.fileBlob);
      console.log("files stored Successfully");

      console.log(cid);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);

      addToContract(val.docName, cid);
    } else {
      alert("Choose any File to Upload");
    }
  }

  async function addToContract(docName, cid) {
    try {
      const upload = await contract.addToDocsArr(docName, cid);
      setLoading(true);
      await upload.wait();
      setLoading(false);
      getDocs();
    } catch (err) {
      console.log(err);
    }
  }

  async function getDocs() {
    try {
      const getDocsTx = await contract.getDocsInfo();
      // console.log(getDocsTx);
      let docsArr = [];
      getDocsTx.forEach((doc) => {
        docsArr.push({
          docName: doc.docName,
          hash: doc.hash,
        });
      });
      setDocs(docsArr);
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(docs);

  async function deleteDoc(val) {
    try {
      const deleteTx = await contract.deleteDocs(val);
      setLoading(true);
      await deleteTx.wait();
      setLoading(false);
      getDocs();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-screen  max-h-screen flex flex-col items-start justify-start bg-[url('/images/bg4.jpg')] bg-cover bg-no-repeat grow-0 relative z-10">
      <Head>
        <title>HealthBase-Docs</title>
        <meta name="description" content="Created with ❤ by SHIKHAR" />
        <link rel="icon" href="/images/ico5.png" />
      </Head>
      {loading && (
        <div className="w-screen z-30 flex flex-col  items-center justify-center h-screen top-0 absolute bg-black/50">
          <span className="  p-4    ">
            <Image
              src="/images/loading2.gif"
              width={300}
              height={300}
              alt="image"
              className="rounded-xl"
            />
          </span>
          <span className="bg-[white] text-[#1b4332] p-3 my-2 text-xl font-semibold relative rounded-xl">
            Transaction is being processed
            <span className="animate-ping absolute -top-1 -right-2 inline-flex h-6 w-6 rounded-full bg-[#0aff99] opacity-75"></span>
            <span className="relative inline-flex -top-4 -right-4 rounded-full h-4 w-4 bg-[#0aff99]"></span>
          </span>
        </div>
      )}
      {showModal && (
        <div className=" h-full w-full absolute z-90 bg-slate-600/30 flex items-center justify-center">
          <div className="flex flex-col sm:w-6/12 w-11/12 sm:h-5/6 h-3/4 bg-white/75 rounded-2xl items-start justify-start gap-2 my-auto z-20">
            <div className="mx-8 mt-4 flex items-center  w-10/12">
              <span className="text-3xl text-center sm:text-4xl mr-auto ">
                Update Your Details
              </span>
            </div>
            <span className="text-base mx-8 text-gray-500 ">
              Enter your updated credentials to manage your documents
            </span>
            <div
              className={` gap-1 flex w-full flex-col items-start  justify-center mt-4 sm:text-xl text-sm`}
            >
              <span className=" text-lg mx-8">Name</span>
              <input
                type="text"
                onChange={handleUpdate}
                name="name"
                className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
                placeholder="John Ali Singh"
              />
              <span className=" text-lg mx-8">Age</span>
              <input
                type="number"
                onChange={handleUpdate}
                name="age"
                className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
                placeholder="12"
              />
              <span className=" text-lg mx-8">Sex</span>
              <input
                type="text"
                onChange={handleUpdate}
                name="sex"
                className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
                placeholder="Dont write NOT YET"
              />
              <span className=" text-lg mx-8">Location</span>
              <input
                type="text"
                onChange={handleUpdate}
                name="location"
                className="text-start text-sm border mx-8 border-zinc-300 indent-4 rounded-sm w-9/12 h-8 "
                placeholder="abc , state , country"
              />
            </div>
            <div className="flex items-center justify-center m-8 gap-8">
              <button
                onClick={() => updateSelf(updateForm)}
                className="mt-auto transition-all duration-300 linear rounded-md py-2 px-4 hover:bg-[#42f0a7] bg-[#0aff99]"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShow(true);
                }}
                className="mt-auto transition-all duration-300 linear rounded-md py-2 px-4 hover:bg-[#ee724c] bg-[#f55b2c]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        className={` flex items-center justify-between py-1.5 w-full text-md transition-all duration-500 linear  text-[#03071e]shadow-md bg-[#00a896] `}
      >
        <div
          className={`flex items-center justify-center gap-1   transition-all duration-300 linear rounded-xl `}
        >
          <span className="p-1 text-white text-xl font-medium">
            HealthBase- Docs
          </span>
          <Image src="/images/ico3.png" width={50} height={38} alt="image" />
        </div>
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <a className=" bg-[#e0fffc] hover:bg-[#b5fff8] transition-all duration-300 linear rounded-xl mx-2 p-1">
              Home
            </a>
          </Link>
        </div>
      </nav>

      <main className=" w-full h-p90 flex items-center justify-center gap-10 overflow-hidden  transition duration-200 ease-linear  ">
        {!showModal && (
          <div
            className={` ${
              show ? "translate-x-0 sm:w-3/12 w-10/12 " : "translate-x-negf w-0 "
            } bg-white/75   my-auto rounded-r-lg sm:h-3/4 h-3/5 relative transition-all duration-200 ease-linear  `}
          >
            <div
              onClick={() => setShow(!show)}
              className={` absolute w-14 h-14 bg-white/75 flex items-center justify-center rounded-lg right-0 top-1/2 translate-y-neg border-2 ${"translate-x-full"} duration-300 transition-all  ease-linear   `}
            >
              {!show ? (
                <Image
                  src="/images/open6.png"
                  alt="img"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/images/close3.png"
                  alt="img"
                  width={40}
                  height={40}
                />
              )}
            </div>

            <div
              className={`${
                show ? "scale-100" : "scale-0"
              } duration-100 transition-all  ease-linear w-full h-full  flex flex-col items-start justify-start `}
            >
              <span className="text-gray-600 text-xs  px-4 mt-6">
                Your Details
              </span>
              <div className="flex items-center justify-start  w-full relative  px-4 ">
                <span className="text-2xl font-medium w-4/6 truncate ">
                  {info.name}
                </span>
                <div
                  onClick={() => {
                    setShowModal(true);
                    setShow(false);
                  }}
                  className="flex items-center justify-center ml-6 cursor-pointer "
                >
                  <Image
                    src="/images/edit.png"
                    alt="img"
                    width={25}
                    height={25}
                  />
                </div>
                <div className="rounded-full absolute right-0 -top-4 p-2  bg-yellow-300">
                  <span className="">ID: {+info.id + 1}</span>
                </div>
              </div>
              <span className="mx-4 mt-2 text-slate-700 text-base">
                Age : {info.age}
              </span>

              <span className="mx-4 mt-2 text-slate-700 text-base">
                Sex : {info.sex}
              </span>
              <span className="mx-4 mt-2 text-slate-700 text-base w-3/4 truncate">
                Location : {info.location}
              </span>
              <span className="mx-4 mt-2 text-base w-3/4 truncate text-slate-700">
                Address : {info.addr}
              </span>

              <div className="mx-4 mt-8 text-base w-3/4  ">
                <span className="text-lg font-medium ">Upload Documents</span>
                <input
                  onChange={handleDocNameUpload}
                  name="docName"
                  placeholder="File Name"
                  type="text"
                  className="mt-2 indent-3 border-2 rounded-lg w-11/12"
                />
                <input
                  onChange={handleFileUpload}
                  // onChange={(e) => setFile(e.target.files[0])}
                  name="fileBlob"
                  placeholder="Files"
                  type="file"
                  className="mt-2 indent-3 border-2  text-xs border-none  rounded-lg w-11/12"
                />
              </div>
              <button
                onClick={() => sendToIpfs(upload)}
                className=" bg-[#31a196] text-[#e4fffd] text-xl mx-auto transition-all duration-300 linear rounded-xl my-8 p-1.5 hover:scale-105 hover:shadow-lg hover:shadow-emerald-300"
              >
                Upload
              </button>
            </div>
          </div>
        )}

        {!showModal && (
          <div
            className={` mx-auto  transition-all duration-300 ease-linear  ml-auto h-full  w-11/12 overflow-y-scroll grid sm:grid-cols-4 grid-cols-2 gap-3 auto-rows-max scrollbar-hide p-3  `}
          >
            {docs &&
              docs.map((itm, ind) => {
                if (itm.docName && itm.hash) {
                  return (
                    <div
                      key={ind}
                      className={` bg-white/75 w-10/12  h-28 rounded-xl  m-3 p-1.5  flex flex-col justify-self-center z-10 `}
                    >
                      {itm.docName && itm.hash && (
                        <>
                          <div
                            className={` flex items-center justify-between relative `}
                          >
                            <span className={`text-xl font-bold mb-2 truncate`}>
                              {itm.docName}
                            </span>
                          </div>
                          <Link
                            href={`https://ipfs.io/ipfs/${itm.hash}`}
                            passHref={true}
                          >
                            <a className={`text-sm text-violet-600 truncate `}>
                              Hash : {itm.hash}
                            </a>
                          </Link>
                          <div
                            onClick={() => deleteDoc(ind)}
                            className="mt-4 ml-auto cursor-pointer  flex items-center justify-center"
                          >
                            <Image
                              src="/images/trash.png"
                              width={20}
                              height={20}
                              alt="image"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        )}
      </main>
    </div>
  );
}
