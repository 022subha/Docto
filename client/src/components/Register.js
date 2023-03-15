import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function Register({ closeModal, setIsLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      const { status } = response.data;
      if (status) {
        message.success("User Registered Successfully!!");
      } else {
        message.error("User Already Exists!!");
      }
    } catch (err) {
      console.log(err);
      message.error("Internal Server Error!!");
    }
  };

  return (
    <div className="center">
      <div className="wrapper">
        <span className="icon-close">
          <ion-icon name="close" onClick={closeModal}></ion-icon>
        </span>
        <div className="form-box login">
          <h2>Register</h2>
          <form action="#">
            <div className="passport">
              <div className="log">
                <img src="/img/gl.svg" alt="" />
                <h5>Continue With Google</h5>
              </div>
              <div className="log">
                <img src="/img/fb.svg" alt="" />
                <h5>Continue With Facebook</h5>
              </div>
            </div>
            <hr />
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail-open"></ion-icon>
              </span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn"
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Register
            </button>
            <div className="login-register">
              <p>
                Don't Have an Account?
                <span
                  className="register-link"
                  onClick={() => {
                    setIsLogin(true);
                  }}
                >
                  {"  "}
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
