import React, { useState } from "react";
import deployContract from "../deployContract";
import Manual from "./Manual";
import "./Sidebar.css";


const AdminPanel = ({ setContractAddress }) => {
  const [activeTab, setActiveTab] = useState("Instructions");


  return (
    <>
    <div className="" style={{width:"20%"}}>
    <div className="sidebar">
      <ul className="list-group list-group-flush">
        {["Instructions", "Add Candidates", "Manage Voting"].map((tab) => (
          <li
            key={tab}
            className={`list-group-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  );
};

export default AdminPanel;
