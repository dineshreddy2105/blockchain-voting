import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminComponents/AdminPanel";
import UserPanel from "./components/UserComponents/UserPanel";
import Home from "./components/Home";
import AuthProvider from "./providers/AuthProvider";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLoginPage from "./components/UserComponents/UserLoginPage";
<<<<<<< HEAD
import AdminLoginPage from "./components/AdminComponents/AdminLoginPage";
import UserSignUpPage from "./components/UserComponents/UserSignUpPage";
import VoterProtectedRoute from "./middlewares/VoterProtectedRoutes"
import AdminProtectedRoute from "./middlewares/AdminProtectedRoutes";
import {ToastContainer} from "react-toastify";
=======
import AdminSignInPage from "./components/AdminComponents/AdminSignInPage";
import UserSignInPage from "./components/UserComponents/UserSignInPage";
>>>>>>> 4caa0d3ac5f8bb69707ee8c62dcc23dd2201d44a
function App() {
  //const [contractAddress, setContractAddress] = useState("");

  return (
    <>
    <ToastContainer position="top-right" />
    <Router>
<<<<<<< HEAD
      <AuthProvider>
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
      </AuthProvider>
=======
      <div className="container-fluid">
        <Routes>
          <Route path="/admin_panel" element={<AdminPanel />} />
          <Route path="/user_panel" element={<UserPanel />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<UserLoginPage />} />
          <Route path="/admin-signin" element={<AdminSignInPage />} />
          <Route path="/sign-up" element={<UserSignInPage />} />
        </Routes>
      </div>
>>>>>>> 4caa0d3ac5f8bb69707ee8c62dcc23dd2201d44a
    </Router>
    </>
  );
}

export default App;
