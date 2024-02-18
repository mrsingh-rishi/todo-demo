import React from "react";
import { NavLink } from "react-router-dom";
import "./Register.css";

const Login = () => {
  return (
    <>
      <div className="container">
        <form class="login-form">
          <h1>Login</h1>
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <br />
          <br />
          <input type="submit" value="Log In" />
          <NavLink to="/register" className="navlink">
            <p className="clickhere">New user, Click here to Register?</p>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
