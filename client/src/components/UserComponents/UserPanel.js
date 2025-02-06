import React, { useState } from "react";
import deployContract from "../../deployContract";
import UserInstructions from "./UserInstructions";
import VoterRegistration from "./VoterRegistration";
import VotingArea from "./VotingArea";
import Results from "./Results";

const UserPanel = ({ setContractAddress }) => {
  // const [candidates, setCandidates] = useState([]);
  // const [candidateName, setCandidateName] = useState("");
  // const [isDeploying, setIsDeploying] = useState(false);

  // const addCandidate = () => {
  //   if (candidateName.trim() !== "") {
  //     setCandidates([...candidates, candidateName]);
  //     setCandidateName("");
  //   }
  // };

  // const deployVotingContract = async () => {
  //   if (candidates.length === 0) {
  //     alert("Please add at least one candidate before deploying.");
  //     return;
  //   }

  //   setIsDeploying(true);
  //   const contract = await deployContract(candidates);
  //   if (contract) {
  //     setContractAddress(contract.options.address);
  //   }
  //   setIsDeploying(false);
  // };

  // return (
  //   <div className="container">
  //     <h2>Admin Panel</h2>
  //     <input
  //       type="text"
  //       value={candidateName}
  //       onChange={(e) => setCandidateName(e.target.value)}
  //       placeholder="Enter candidate name"
  //     />
  //     <button onClick={addCandidate}>Add Candidate</button>

  //     <ul>
  //       {candidates.map((c, index) => (
  //         <li key={index}>{c}</li>
  //       ))}
  //     </ul>

  //     <button onClick={deployVotingContract} disabled={isDeploying}>
  //       {isDeploying ? "Deploying..." : "Deploy Contract"}
  //     </button>
  //   </div>
  // );

  const [activeTab, setActiveTab] = useState("Instructions");
  function handleLogout() {}
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 bg-light vh-100">
            <div className="sidebar">
              <h1 style={{ color: "white" }} className="p-2">
                Voting App
              </h1>
              <hr style={{ color: "white" }} />
              <ul className="list-group list-group-flush">
                {[
                  "Instructions",
                  "Voter Registration",
                  "Voting Area",
                  "Results",
                ].map((tab) => (
                  <li
                    key={tab}
                    className={`list-group-item ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {/* Main Content (80% width) */}
          <div className="col-md-9 col-lg-10">
            <div className="content p-3">
              {activeTab === "Instructions" && <UserInstructions />}
              {activeTab === "Voter Registration" && <VoterRegistration />}
              {activeTab === "Voting Area" && <VotingArea />}
              {activeTab === "Results" && <Results />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanel;
