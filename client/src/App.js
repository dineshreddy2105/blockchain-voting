import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminComponents/AdminPanel";
import UserPanel from "./components/UserComponents/UserPanel";
import Home from "./components/Home";
import AuthProvider from "./providers/AuthProvider";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLoginPage from "./components/UserComponents/UserLoginPage";
import AdminLoginPage from "./components/AdminComponents/AdminLoginPage";
import UserSignUpPage from "./components/UserComponents/UserSignUpPage";
import VoterProtectedRoute from "./middlewares/VoterProtectedRoutes"
import AdminProtectedRoute from "./middlewares/AdminProtectedRoutes";
import { ToastContainer } from "react-toastify";
import BlockchainProvider from "./providers/BlockChainProvider";
function App() {
  //const [contractAddress, setContractAddress] = useState("");

  return (
    <>
      <ToastContainer position="top-right" />
      <Router>
        <AuthProvider>
          <BlockchainProvider>
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<UserLoginPage />} />
                <Route path="/admin-signin" element={<AdminLoginPage />} />
                <Route path="/sign-up" element={<UserSignUpPage />} />

                <Route element={<VoterProtectedRoute />}>
                  <Route path="/user_panel" element={<UserPanel />} />
                </Route>

                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin_panel" element={<AdminPanel />} />
                </Route>
              </Routes>
            </div>
          </BlockchainProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
