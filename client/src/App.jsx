import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';
import './App.css';

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const networkId = await web3Instance.eth.net.getId();
                    const deployedNetwork = VotingContract.networks[networkId];
                    if (!deployedNetwork) {
                        setErrorMessage("Contract not deployed on the selected network.");
                        return;
                    }

                    const contractInstance = new web3Instance.eth.Contract(VotingContract.abi, deployedNetwork.address);
                    setContract(contractInstance);
                    await loadCandidatesAndVotes(contractInstance);

                    contractInstance.events.VoteCast({}, (error, event) => {
                        if (!error) {
                            loadCandidatesAndVotes(contractInstance);
                        }
                    });
                } catch (error) {
                    setErrorMessage("Error connecting to MetaMask.");
                }
            } else {
                setErrorMessage("MetaMask not detected. Please install it.");
            }
        };
        init();
    }, []);

    const loadCandidatesAndVotes = async (contractInstance) => {
        if (!contractInstance) return;
        try {
            const count = await contractInstance.methods.candidateCount().call();
            const candidateNames = [];
            const voteCounts = [];

            for (let i = 0; i < count; i++) {
                candidateNames.push(await contractInstance.methods.getCandidateName(i).call());
                voteCounts.push(await contractInstance.methods.getCandidateVotes(i).call());
            }

            setCandidates(candidateNames);
            setVotes(voteCounts);
        } catch (error) {
            setErrorMessage("Error loading candidates and votes.");
        }
    };

    const castVote = async () => {
        if (selectedCandidate === null) {
            setErrorMessage("Please select a candidate.");
            return;
        }

        if (contract && account) {
            try {
                await contract.methods.vote(selectedCandidate).send({ from: account });
                setHasVoted(true);
            } catch (error) {
                setErrorMessage("Error casting vote.");
            }
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Voting DApp</h1>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {!window.ethereum && (
                <div className="metamask-instructions">
                    <p>Please install MetaMask:</p>
                    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                        <button className="install-metamask-button">Install MetaMask</button>
                    </a>
                </div>
            )}

            {window.ethereum && !hasVoted && (
                <div className="voting-section">
                    <h2 className="voting-title">Cast Your Vote</h2>
                    <div className="candidates-list">
                        {candidates.map((candidate, index) => (
                            <label key={index} className="candidate-item">
                                <input
                                    type="radio"
                                    className="candidate-radio"
                                    name="candidate"
                                    value={index}
                                    onChange={() => setSelectedCandidate(index)}
                                />
                                <span className="candidate-name">{candidate}</span>
                            </label>
                        ))}
                    </div>
                    <button className="vote-button" onClick={castVote} disabled={selectedCandidate === null}>
                        Vote
                    </button>
                </div>
            )}

            {hasVoted && <p className="voted-message">You have already voted.</p>}

            <div className="results-section">
                <h2 className="results-title">Vote Counts</h2>
                <ul className="results-list">
                    {candidates.map((candidate, index) => (
                        <li key={index}>{candidate}: {votes[index] || 0}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
