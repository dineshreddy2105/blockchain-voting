import React, { useState } from 'react';
import '../../styles/VoterRegistration.css';

const VoterRegistration = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate sending OTP to voter's email
    console.log('Sending OTP to email for Aadhaar:', aadhaarNumber);
    setOtpSent(true);
    setErrorMessage('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === '123456') { // Replace with actual OTP verification logic
      console.log('OTP verified successfully for Aadhaar:', aadhaarNumber);
      setSuccessMessage('Voter registered successfully!');
      setErrorMessage('');
      // Reset the form
      setAadhaarNumber('');
      setAccountAddress('');
      setOtp('');
      setOtpSent(false);
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
      // Close OTP form and show Aadhaar and address form again
      setOtpSent(false);
      setOtp('');
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
            <label htmlFor="accountAddress">MetaMask Account Address:</label>
            <input
              type="text"
              id="accountAddress"
              className="form-control"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Send OTP</button>
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
          <button type="submit" className="btn btn-primary mt-3">Verify OTP</button>
          <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={handleBackToForm}>Back</button> {/* fix back button */}
        </form>
      )}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
};

export default VoterRegistration;