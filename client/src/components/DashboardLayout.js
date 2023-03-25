import { message, Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SidebarMenu } from "../Data/data.js";
import { setUser } from "../redux/features/userSlice";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <img className="logo" src="/img/logo.svg" alt="" />
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <ion-icon name={menu.icon}></ion-icon>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`}>
                <ion-icon name="log-out"></ion-icon>
                <Link
                  onClick={() => {
                    Modal.confirm({
                      title: "Confirm",
                      content: "Are you sure you want to logout?",
                      onOk() {
                        Cookies.remove("token");
                        message.success("Logout Successfully!!");
                        dispatch(setUser(null));
                        navigate("/");
                      },
                    });
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header1">
              <div className="block">
                <ion-icon name="notifications"></ion-icon>
                <h3> {user.name}</h3>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
