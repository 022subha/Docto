import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { hideLoading, showLoading } from "../redux/features/alertSlice";

export default function Login({ closeModal, setIsLogin, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(hideLoading());
      const { status, token } = response.data;
      if (status) {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        Cookies.set("token", token, { expires });
        setUsername(token);
        message.success("Login Successfully!!");
        closeModal();
      } else {
        message.error("Invalid Credentials!!");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Internal Error");
    }
  };

  return (
    <div className="center">
      <div className="wrapper">
        <span className="icon-close">
          <ion-icon name="close" onClick={closeModal}></ion-icon>
        </span>
        <div className="form-box login">
          <h2>Login</h2>
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
            <div className="remember-forget">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="/forget-password">Forget Password?</a>
            </div>
            <button
              type="submit"
              className="btn"
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Login
            </button>
            <div className="login-register">
              <p>
                Don't Have an Account?
                <span
                  className="register-link"
                  onClick={() => {
                    setIsLogin(false);
                  }}
                >
                  {"  "}
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
