import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import register from "../assets/registerr.jpg"
import { api } from "../global";
export const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    try {
      const response = await axios.post(
        `${api}/api/auth/createuser`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );
      const json = response.data;
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/notes");
        props.showAlert("SignUp Completed", "success");
      } else {
        props.showAlert("SignUp Error", "danger");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      props.showAlert("SignUp Error", "danger");
    }
  };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h100  container">
      <div className="col-1"></div>

      <form className="col-4" onSubmit={handleSubmit}>
        <div>
          <div className=" text-primary my-4 text-center">
            <h1>Cloud Notes</h1>
          </div>
          <div className="text-dark my-4 text-center">
            <h5> Creat Your Account on SKYNotE</h5>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-3"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control my-3"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block my-3">
          Submit
        </button>
        <div className="text-center">
          <p className="text-danger">
            Already a member ? <Link to="/">Log in</Link>
          </p>
        </div>
      </form>
      <div className="col-2"></div>
      <div className="col-4">
        <img src={register}  className="register-img"/>
      </div>
      <div className="col-1"></div>
    </div>
  );
};
