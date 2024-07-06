import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
const Login=()=>{
    const email = process.env.REACT_APP_EMAIL;
  const pass = process.env.REACT_APP_PASS;
  //alert(email);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = () => {
    const Iemail = document.getElementById("email").value;
    const Ipass = document.getElementById("pass").value;

    if (Iemail === "" || Ipass === "") {
      setError("Enter Email and Password to login");
    } else if (email === Iemail && pass === Ipass) {
      localStorage.setItem("AdminEmail",email);
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-left">
          <div className="login-form">
            <h1 className="login-title">Login as Admin</h1>
            <input
              type="email"
              placeholder="Admin email"
              name="email"
              required
              className="login-input"
              style={{ backgroundColor: "white" }}
              id="email"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              id="pass"
              className="login-input"
              style={{ backgroundColor: "white" }}
            />
            <div className="login-error">{error}</div>            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              Sign In as Admin
            </button>
          </div>
        </div>
        </div>
        </div>
       
  );
};
export default Login;