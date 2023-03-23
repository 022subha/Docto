import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "../DropDown.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import "./Navbar.css";

const customStyles = {
  content: {
    overflow: "hidden",
    border: "0px",
  },
};
export default function Navbar({ setUsername }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isDrop, setIsDrop] = useState(false);
  const { user } = useSelector((state) => state.user);
  // const { isDrop } = useSelector((state) => state.dropdown);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) openModal();
  }, []);
  return (
    <>
      <div className="header">
        <img className="logo" src="/img/logo.svg" alt="" />
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>

          {!user ? (
            <button className="btnLogin-popup" onClick={openModal}>
              Login
            </button>
          ) : (
            <>
              <ion-icon name="notifications"></ion-icon>
              <ion-icon
                name="person-circle"
                onClick={() => {
                  setIsDrop(!isDrop);
                }}
              ></ion-icon>

              <Link
                style={{ marginRight: "-60px" }}
                onClick={() => {
                  setIsDrop(!isDrop);
                }}
              >
                {user.name}
              </Link>
              <ion-icon
                name={`chevron-${!isDrop ? "down" : "up"}`}
                onClick={() => {
                  setIsDrop(!isDrop);
                }}
              ></ion-icon>
            </>
          )}
        </nav>
        {isLogin ? (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Login Modal"
            ariaHideApp={false}
            style={customStyles}
          >
            <Login
              closeModal={closeModal}
              setIsLogin={setIsLogin}
              setUsername={setUsername}
            />
          </Modal>
        ) : (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Login Modal"
            ariaHideApp={false}
            style={customStyles}
          >
            <Register closeModal={closeModal} setIsLogin={setIsLogin} />
          </Modal>
        )}
      </div>
      {user && isDrop && (
        <DropDown isDrop={isDrop} setIsDrop={setIsDrop} openModal={openModal} />
      )}
    </>
  );
}
