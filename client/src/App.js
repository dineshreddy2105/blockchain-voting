import React, { useState } from "react";
// import AdminPanel from "./components/AdminComponents/AdminPanel";
import UserPanel from "./components/UserComponents/UserPanel";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [contractAddress, setContractAddress] = useState("");

    return (
      // <div>
      //   {!contractAddress ? (
      //     <AdminPanel setContractAddress={setContractAddress} />
      //   ) : (
      //     <p>Contract Deployed at: {contractAddress}</p>
      //   )}
      // </div>
      <UserPanel />
    );
}

export default App;
