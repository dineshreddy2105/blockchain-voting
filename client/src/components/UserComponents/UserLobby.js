import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlockchainContext } from "../../providers/BlockChainProvider";

const UserLobby = () => {
    const { contractInstance } = useContext(BlockchainContext);
    const navigate = useNavigate();

    const [electionName, setElectionName] = useState(null);
    const [electionDescription, setElectionDescription] = useState(null);
    const [isElectionCreated, setIsElectionCreated] = useState(false);

    // Fetch Election Details
    useEffect(() => {
        const fetchElectionDetails = async () => {
            try {
                if (!contractInstance) return;

                const details = await contractInstance.methods.electionDetails().call();

                if (details.electionName) {
                    setElectionName(details.electionName);
                    setElectionDescription(details.description);
                    setIsElectionCreated(true);
                } else {
                    setIsElectionCreated(false);
                }
            } catch (error) {
                console.error("Error fetching election details:", error);
            }
        };

        if (contractInstance) {
            fetchElectionDetails();
        }
    }, [contractInstance]);

    return (
        <div className="user-lobby">
            {isElectionCreated ? (
                <>
                    <h2>Election: {electionName}</h2>
                    <p>Description: {electionDescription}</p>
                    <button onClick={() => navigate("/user_panel?tab=Instructions")} className="btn btn-primary">
                        Go to Election Instructions
                    </button>
                </>
            ) : (
                <h3>No active election found.</h3>
            )}
        </div>
    );
};

export default UserLobby;
