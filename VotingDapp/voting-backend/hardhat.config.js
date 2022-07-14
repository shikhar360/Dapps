require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY = process.env.ALCHEMY_KEY;
const KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: ALCHEMY,
      accounts: [KEY],
    },
  },
};
