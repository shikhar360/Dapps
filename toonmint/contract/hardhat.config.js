require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()



module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
