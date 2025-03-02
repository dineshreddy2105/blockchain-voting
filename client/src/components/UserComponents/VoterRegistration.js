import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingContract from '../../contracts/Voting.json';
import { toast, ToastContainer } from "react-toastify";
import '../../styles/VoterRegistration.css';
import axios from 'axios';

const VoterRegistration = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  // const [generatedOtp, setGeneratedOtp] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [ElectionInstance, setElectionInstance] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = VotingContract.networks[networkId];

          if (!deployedNetwork) {
            setErrorMessage('Smart contract not deployed on this network.');
            return;
          }

          const instance = new web3Instance.eth.Contract(
            VotingContract.abi,
            deployedNetwork.address
          );

          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setElectionInstance(instance);
        } catch (error) {
          console.error('Web3 Initialization Error:', error);
          setErrorMessage('Failed to connect to blockchain.');
        }
      } else {
        setErrorMessage('Please install MetaMask.');
      }
    };

    init();
  }, []);

  const showToast = (message, type = "info") => {
    toast[type](message, { autoClose: 3000 });
  };

  // const generateOtp = () => {
  //   return Math.floor(100000 + Math.random() * 900000).toString();
  // };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setErrorMessage('Invalid Aadhaar number. Must be 12 digits.');
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/send_otp", { aadhar_no: aadhaarNumber });
      // setOtp(data.otp);
      showToast("OTP sent successfully!", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to send OTP", "error");
    }

    // const newOtp = generateOtp();
    // setGeneratedOtp(newOtp);
    // console.log(`OTP sent to voter's email: ${newOtp}`); // Simulate email sending
    setOtpSent(true);
    setErrorMessage('');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/send_otp", { aadhar_no: aadhaarNumber, otp });
      showToast(data.message, "success")

    }
    catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
      setOtp('');
      showToast(error.response?.data?.message || "Failed to verify OTP", "error");
      return;
    }


    try {
      await ElectionInstance.methods
        .registerVoter(name, aadhaarNumber)
        .send({ from: account, gas: 1000000 });

      setSuccessMessage('Voter registered successfully!');
      setErrorMessage('');
      setAadhaarNumber('');
      setName('');
      setOtp('');
      setOtpSent(false);
    } catch (error) {
      console.error('Error registering voter:', error);
      setErrorMessage('Failed to register voter. Please try again.');
    }
  };

  const handleBackToForm = () => {
    setOtpSent(false);
    setOtp('');
    setErrorMessage('');
  };

  return (
    <div className="container">
      <h2>Voter Registration</h2>
      {!otpSent ? (
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
              value={account || ''}
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
          <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={handleBackToForm}>
            Back
          </button>
        </form>
      )}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default VoterRegistration;
