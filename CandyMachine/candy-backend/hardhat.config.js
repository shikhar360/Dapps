require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    /*rinkeby*/ mumbai: {                          //-- change this to `mumbai`
      url: "https://rpc.ankr.com/polygon_mumbai",  //-- also this if you plan to deploy it on mumbai
      accounts: [PRIVATE_KEY],
    },
  },
};
