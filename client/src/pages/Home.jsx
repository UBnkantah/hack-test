import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { AbiData } from "../utils/AbiData";

const Home = () => {
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState([]);
  const [provider, setProvider] = useState("");
  const [balance, setBalance] = useState(0);
  const [records, setRecords] = useState([]);
  const [address, setAddress] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ethersFunc = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const contractTest = new ethers.Contract(
        contractAddress,
        AbiData,
        signer
      );
      console.log(contractTest);
      setContract(contractTest);
      setProvider(signer);
      const signAddress = await signer.getAddress();
      setAddress(signAddress);
      console.log(signAddress);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    ethersFunc();
  }, []);

  const donate = async () => {
    try {
      const donateMoney = await contract.Donate({
        value: ethers.utils.parseEther(amount),
      });
      console.log(donateMoney);
    } catch (err) {
      console.log(err);
    }
  };

  const viewTotalDonate = async () => {
    try {
      const viewBal = await contract.donorBalance(address);

      setBalance(ethers.utils.formatEther(viewBal));
    } catch (err) {
      console.log(err);
    }
  };

  const usersDonations = async () => {
    try {
      const DonorRecords = await contract.viewDonorDonations(address);
      console.log(DonorRecords);
      setRecords(DonorRecords);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          name=""
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
          id=""
        />
        <button className="btn btn-success" onClick={ethersFunc}>
          Connect
        </button>
        <br />
        <br />
        <br />
        <br />
        <button onClick={donate}>Donate</button>
        <br />
        <br />
        <br />
        <br />
        <button onClick={usersDonations}>Show</button>
      </div>
    </div>
  );
};

export default Home;
