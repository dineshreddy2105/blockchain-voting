import React, { useState } from "react";
import deployContract from "../deployContract";
import Instructions from "./Instructions";
import AddCandidates from "./AddCandidates";
import ManageVoting from "./ManageVoting";
import "./Sidebar.css";

const AdminPanel = ({ setContractAddress }) => {
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

  return (
    <>
      <div className="" style={{ width: "20%" }}>
        <div className="sidebar">
          <ul className="list-group list-group-flush">
            {["Instructions", "Add Candidates", "Manage Voting"].map((tab) => (
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
        </div>
      </div>
      <div>
        <div className="content p-3" style={{ width: "80%" }}>
          {activeTab === "Instructions" && <Instructions />}
          {activeTab === "Add Candidates" && <AddCandidates />}
          {activeTab === "Manage Voting" && <ManageVoting />}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
