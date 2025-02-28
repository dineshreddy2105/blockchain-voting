import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingContract from '../../contracts/Voting.json'; // Ensure the contract JSON file is correctly set

const ManageElection = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [electionName, setElectionName] = useState('');
  const [electionDescription, setElectionDescription] = useState('');
  const [currentPhase, setCurrentPhase] = useState('');
  const [electionCreated, setElectionCreated] = useState(true); // Set to true to show phase controls by default
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        if (deployedNetwork) {
          const contractInstance = new web3Instance.eth.Contract(
            VotingContract.abi,
            deployedNetwork.address
          );
          setWeb3(web3Instance);
          setContract(contractInstance);
          setAccount(accounts[0]);
          const phase = await contractInstance.methods.getCurrentPhase().call();
          setCurrentPhase(phase);
        }
      } else {
        alert('Please install MetaMask to interact with this DApp');
      }
    };
    loadBlockchainData();
  }, []);

  const handleCreateElection = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        await contract.methods.createElection(electionName, electionDescription).send({ from: account });
        setSuccessMessage('Election created successfully!');
        setElectionCreated(true);
        const phase = await contract.methods.getCurrentPhase().call();
        setCurrentPhase(phase);
      } catch (error) {
        console.error(error);
        setSuccessMessage('Failed to create election.');
      }
    }
  };

  const handleChangePhase = async () => {
    if (contract) {
      try {
        await contract.methods.changePhase().send({ from: account });
        const newPhase = await contract.methods.getCurrentPhase().call();
        setCurrentPhase(newPhase);
        setSuccessMessage(`Election phase changed to ${newPhase}`);
      } catch (error) {
        console.error(error);
        setSuccessMessage('Failed to change phase.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Manage Election</h2>
      <form onSubmit={handleCreateElection}>
        <div className="form-group">
          <label htmlFor="electionName">Election Name:</label>
          <input
            type="text"
            id="electionName"
            className="form-control"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="electionDescription">Election Description:</label>
          <textarea
            id="electionDescription"
            className="form-control"
            value={electionDescription}
            onChange={(e) => setElectionDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Election</button>
      </form>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {electionCreated && (
        <div className="mt-5">
          <h3>Current Phase: {currentPhase}</h3>
          {currentPhase !== 'Election Ended' && (
            <button className="btn btn-secondary mt-3" onClick={handleChangePhase}>
              {currentPhase === 'Registration' && 'Start Voting Phase'}
              {currentPhase === 'Voting' && 'Start Results Phase'}
              {currentPhase === 'Results' && 'End Election'}
            </button>
          )}
        </div>
      )}
      {currentPhase === 'Registration' && electionCreated && (
        <div className="alert alert-warning mt-3">
          Reminder: Please add candidates before starting the voting phase.
        </div>
      )}
    </div>
  );
};

export default ManageElection;
