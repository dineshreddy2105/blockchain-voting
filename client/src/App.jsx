import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingContract from "./contracts/Voting.json";
import "./App.css";

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [chairperson, setChairperson] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [newCandidate, setNewCandidate] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                try {
                    const accounts = await web3Instance.eth.requestAccounts();
                    setAccount(accounts[0]);

                    const networkId = await web3Instance.eth.net.getId();
                    const deployedNetwork = VotingContract.networks[networkId];
                    if (!deployedNetwork) {
                        setErrorMessage("Contract not deployed on this network.");
                        return;
                    }

                    const contractInstance = new web3Instance.eth.Contract(VotingContract.abi, deployedNetwork.address);
                    setContract(contractInstance);

                    const chairpersonAddress = await contractInstance.methods.chairperson().call();
                    setChairperson(chairpersonAddress);

                    loadCandidatesAndVotes(contractInstance, accounts[0]);

                    // Event listener for MetaMask account change
                    window.ethereum.on("accountsChanged", handleAccountChange);

                } catch (error) {
                    setErrorMessage("Error connecting to MetaMask.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrorMessage("MetaMask not detected. Please install it.");
                setIsLoading(false);
            }
        };

        init();

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", handleAccountChange);
            }
        };
    }, []);

    // Function to handle account changes
    const handleAccountChange = async (accounts) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (contract) {
                loadCandidatesAndVotes(contract, accounts[0]);
            }
        } else {
            setAccount(null);
            setCandidates([]);
            setVotes([]);
        }
    };

    const loadCandidatesAndVotes = async (contractInstance, userAccount) => {
        try {
            const count = await contractInstance.methods.candidateCount().call();
            const candidateNames = [];
            const voteCounts = [];

            for (let i = 0; i < count; i++) {
                const name = await contractInstance.methods.getCandidateName(i).call();
                candidateNames.push(name);
                const votes = await contractInstance.methods.getCandidateVotes(i).call();
                voteCounts.push(votes);
            }

            setCandidates(candidateNames);
            setVotes(voteCounts);

            if (userAccount) {
                const hasVotedCheck = await contractInstance.methods.hasVoted(userAccount).call();
                setHasVoted(hasVotedCheck);
            }

            setChairperson(await contractInstance.methods.chairperson().call()); // Ensure chairperson updates

        } catch (error) {
            setErrorMessage("Error loading data from the contract.");
        }
    };

    const addCandidate = async () => {
        if (!newCandidate) {
            setErrorMessage("Candidate name cannot be empty.");
            return;
        }

        if (contract && account === chairperson) {
            setIsLoading(true);
            try {
                await contract.methods.addCandidate(newCandidate).send({ from: account });
                setNewCandidate("");
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage(error.message || "Error adding candidate.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const castVote = async () => {
        if (contract && account && selectedCandidate !== null) {
            setIsLoading(true);
            try {
                await contract.methods.vote(selectedCandidate).send({ from: account });
                setHasVoted(true);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage(error.message || "Error casting vote.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Voting DApp</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {account ? (
                <p>Connected Account: {account} {account === chairperson ? "(Admin)" : ""}</p>
            ) : (
                <button onClick={() => window.ethereum.request({ method: "eth_requestAccounts" })}>
                    Connect MetaMask
                </button>
            )}

            {account === chairperson && (
                <div className="admin-section">
                    <h2>Add Candidate</h2>
                    <input
                        type="text"
                        value={newCandidate}
                        onChange={(e) => setNewCandidate(e.target.value)}
                        placeholder="Enter candidate name"
                    />
                    <button onClick={addCandidate} disabled={isLoading}>Add</button>
                </div>
            )}

            <div className="voting-section">
                <h2>Cast Your Vote</h2>
                <div className="voting-subsection">    
                {hasVoted ? (
                    <p className="voted-message">Congrats!! You have successfully voted.</p>
                ) : (
                    
                    candidates.map((candidate, index) => (
                        <div className="candidate" key={index}>
                        <span>{candidate}</span>
                        <label key={index}>
                            <input
                                type="radio"
                                name="candidate"
                                onChange={() => setSelectedCandidate(index)}
                                disabled={hasVoted}
                                />
                        </label>
                    </div>
                    ))
                )}
                </div>
                <button onClick={castVote} disabled={selectedCandidate === null || hasVoted || isLoading}>
                    Vote
                </button>
            </div>

            <div className="results-section">
                <h2>Vote Counts</h2>
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>{candidate}: {votes[index] || 0} votes</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
