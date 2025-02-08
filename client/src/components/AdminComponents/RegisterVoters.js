import React, { useState, useEffect } from "react";

const RegisterVoters = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registeredVoters, setRegisteredVoters] = useState([]);

  useEffect(() => {
    // Simulate fetching registered voters from the backend
    const fetchRegisteredVoters = async () => {
      try {
        // Replace with actual logic to fetch registered voters
        const voters = [
          {
            address: "0x1234567890abcdef1234567890abcdef12345678",
            status: "Registered",
          },
          {
            address: "0xabcdef1234567890abcdef1234567890abcdef12",
            status: "Registered",
          },
          {
            address: "0x7890abcdef1234567890abcdef1234567890abcd",
            status: "Registered",
          },
        ];
        setRegisteredVoters(voters);
      } catch (error) {
        console.error("Error fetching registered voters:", error);
      }
    };

    fetchRegisteredVoters();
  }, []);

  const handleRegisterVoter = async (e) => {
    e.preventDefault();
    try {
      // Simulate registering voter using wallet address
      console.log("Registering Voter:", walletAddress);
      // Replace with actual registration logic
      setSuccessMessage("Voter registered successfully!");
      setErrorMessage("");
      setWalletAddress("");

      // Update the list of registered voters
      setRegisteredVoters((prevVoters) => [
        ...prevVoters,
        { address: walletAddress, status: "Registered" },
      ]);
    } catch (error) {
      console.error("Error registering voter:", error);
      setErrorMessage("Failed to register voter. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="container">
        <h2>Registered Voters</h2>
        <ul className="list-group mb-5 p-3">
          {registeredVoters.map((voter, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center bg-white text-dark"
            >
              {voter.address}
              <span className="badge badge-success  bg-white text-dark">{voter.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <h2>Register Voters</h2>
        <form onSubmit={handleRegisterVoter}>
          <div className="form-group">
            <label htmlFor="walletAddress">Wallet Address:</label>
            <input
              type="text"
              id="walletAddress"
              className="form-control"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register Voter
          </button>
        </form>
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default RegisterVoters;
