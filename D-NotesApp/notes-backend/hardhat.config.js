require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const API_KEY = process.env.ALCHEMY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEYNO;
module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: API_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
};
