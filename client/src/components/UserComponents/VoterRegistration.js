import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import VotingContract from "../../contracts/Voting.json";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/VoterRegistration.css";
import axios from "axios";
import { BlockchainContext } from "../../providers/BlockChainProvider";

const VoterRegistration = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { web3, account, contractInstance } = useContext(BlockchainContext);
  // const [web3, setWeb3] = useState(null);
  // const [account, setAccount] = useState(null);
  // const [contractInstance, setcontractInstance] = useState(null);
  const [voterStatus, setVoterStatus] = useState(null);

  // useEffect(() => {
  //   const init = async () => {
  //     if (window.ethereum) {
  //       const web3Instance = new Web3(window.ethereum);
  //       try {
  //         await window.ethereum.request({ method: "eth_requestAccounts" });
  //         const accounts = await web3Instance.eth.getAccounts();
  //         const networkId = await web3Instance.eth.net.getId();
  //         const deployedNetwork = VotingContract.networks[networkId];

  //         if (!deployedNetwork) {
  //           setErrorMessage("Smart contract not deployed on this network.");
  //           return;
  //         }

  //         const instance = new web3Instance.eth.Contract(
  //           VotingContract.abi,
  //           deployedNetwork.address
  //         );

  //         setWeb3(web3Instance);
  //         setAccount(accounts[0]);
  //         setcontractInstance(instance);

  //         // Fetch voter status if registered
  //         fetchVoterStatus(instance, accounts[0]);
  //       } catch (error) {
  //         console.error("Web3 Initialization Error:", error);
  //         setErrorMessage("Failed to connect to blockchain.");
  //       }
  //     } else {
  //       setErrorMessage("Please install MetaMask.");
  //     }
  //   };

  //   init();
  // }, []);

  const fetchVoterStatus = async (instance, userAccount) => {
    try {
      const voter = await instance.methods.voterDetails(userAccount).call();
      if (voter.isRegistered) {
        setVoterStatus(voter);
      }
    } catch (error) {
      console.error("Error fetching voter status:", error);
    }
  };

  const showToast = (message, type = "info") => {
    toast[type](message, { autoClose: 3000 });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setErrorMessage("Invalid Aadhaar number. Must be 12 digits.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/send_otp", { aadhar_no: aadhaarNumber });
      showToast("OTP sent successfully!", "success");
      setOtpSent(true);
      setErrorMessage("");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to send OTP", "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await contractInstance.methods.registerVoter(name, aadhaarNumber).send({ from: account, gas: 1000000 });

      await axios.post("http://localhost:5000/api/users/verifyOTP", { aadhar_no: aadhaarNumber, otp });
      showToast("OTP Verified!", "success");


      setSuccessMessage("Voter registered successfully!");
      setOtpSent(false);
      setErrorMessage("")
      setAadhaarNumber("");
      setName("");
      setOtp("");

      fetchVoterStatus(contractInstance, account);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      showToast(error.response?.data?.message || "Failed to verify OTP", "error");
    }
  };

  return (
    <div className="container">
      <h2>Voter Registration</h2>
      {voterStatus ? (
        <div className="alert alert-info mt-3">
          <h4>Registration Status</h4>
          <p><strong>Name:</strong> {voterStatus.name}</p>
          <p><strong>Address:</strong> {voterStatus.voterAddress}</p>
          <p><strong>Verified:</strong> {voterStatus.isVerified ? "✅ Verified" : "❌ Not Verified"}</p>
          <p><strong>Has Voted:</strong> {voterStatus.hasVoted ? "🗳️ Yes" : "❌ No"}</p>
        </div>
      ) : (
        !otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
              <input
                type="text"
                id="aadhaarNumber"
                className="form-control"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountAddress">MetaMask Account Address:</label>
              <input
                type="text"
                id="accountAddress"
                className="form-control"
                value={account || ""}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Verify OTP
            </button>
          </form>
        )
      )}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default VoterRegistration;
