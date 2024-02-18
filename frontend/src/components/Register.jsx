import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleEvent = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Create Account</h1>
          <input
            type="text"
            onChange={handleEvent}
            name="username"
            placeholder="Username"
          />
          <input
            type="password"
            onChange={handleEvent}
            name="password"
            placeholder="Password"
          />
          <br />
          <br />
          <input type="submit" value="Sign Up" />
          <br />
          <NavLink to="/" className="navlink">
            <p className="clickhere">Already a user, login? </p>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Register;
