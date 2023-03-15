import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Login from "./Login.js";
import Register from "./Register.js";

const customStyles = {
  content: {
    overflow: "hidden",
    border: "0px",
  },
};
export default function Navbar({ username, setUsername }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          {!username ? (
            <button className="btnLogin-popup" onClick={openModal}>
              Login
            </button>
          ) : (
            <a href="/contact">{username}</a>
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
    </>
  );
}
