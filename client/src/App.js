import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./components/AdminComponents/AdminPanel";
import UserPanel from "./components/UserComponents/UserPanel";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [contractAddress, setContractAddress] = useState("");

    return (
      <Router>
        <div className="container-fluid m-0">
          <Routes>
            <Route path="/admin" element={<AdminPanel setContractAddress={setContractAddress} />} />
            <Route path="/voter" element={<UserPanel />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
