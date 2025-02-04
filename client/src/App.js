import React, { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [contractAddress, setContractAddress] = useState("");

    return (
      <div>
        {!contractAddress ? (
          <AdminPanel setContractAddress={setContractAddress} />
        ) : (
          <p>Contract Deployed at: {contractAddress}</p>
        )}
      </div>
    );
}

export default App;
