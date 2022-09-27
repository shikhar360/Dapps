require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ANKR_URL = process.env.ANKR_URL;
const KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: ANKR_URL,
      accounts: [KEY],
    },
  },
};
