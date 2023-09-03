require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    // Define your network settings (e.g., localhost, Rinkeby, etc.).
  },
  solidity: {
    version: "0.8.19", // Match this with your contract's pragma version.
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
