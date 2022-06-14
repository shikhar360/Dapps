const contractAddress = "0xc20eF2Dcd500590D112BfEeC7ebb777732922667";
const contractABI = [
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let moodContract;
let signer;
let provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    moodContract = new ethers.Contract(contractAddress, contractABI, signer);
  });
});

const getMood = async () => {
  const getMoodPromise = moodContract.getMood();
  const Mood = await getMoodPromise;
  document.querySelector(".show-mood").textContent = `Your Mood is ${Mood}`;
  console.log(Mood);
};

const setMood = async () => {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = moodContract.setMood(mood);
  await setMoodPromise;
};
