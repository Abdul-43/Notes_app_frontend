import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { api } from "../global";
import axios from "axios";
export const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("log in");
    try {
      const response = await axios.post(
        `${api}/api/auth/login`,
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow the desired origin
          },
        }
      );

      const json = response.data;
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/notes");
        props.showAlert("Logged In", "success");
      } else {
        props.showAlert("Don't have an account", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      props.showAlert("Error logging in", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h100  container">
      <div className="col-1"></div>
      <div className="col-4 ">
        <img src={login} className="login-img" />
      </div>
      <div className="col-2"></div>
      <form className="col-4" onSubmit={handleSubmit}>
        <div>
          <div className=" text-primary my-4 text-center">
            <h1>Cloud Notes</h1>
          </div>
          <div className="text-dark my-4 text-center">
            <h5>Log in to Your Notebook</h5>
          </div>
        </div>
        <div className="form-group ">
          <input
            type="email"
            className="form-control my-4"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control my-4"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block my-3">
          Submit
        </button>
        <div className="text-center">
          <p className="text-danger">
            Not a member ? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
      <div className="col-1"></div>
    </div>
  );
};
