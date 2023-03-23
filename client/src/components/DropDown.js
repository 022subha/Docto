import { message, Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";

export default function DropDown({ isDrop, setIsDrop, openModal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="dropdown">
      {user && (user.isAdmin || user.isDoctor) && (
        <li>
          <Link to="/dashboard">
            <ion-icon name="grid"></ion-icon>
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link to="/settings">
          <ion-icon name="settings"></ion-icon>Settings
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            Modal.confirm({
              title: "Confirm",
              content: "Are you sure you want to logout?",
              onOk() {
                Cookies.remove("token");
                message.success("Logout Successfully!!");
                setIsDrop(false);
                dispatch(setUser(null));
                openModal();
              },
            });
          }}
        >
          <ion-icon name="log-out"></ion-icon>Logout
        </Link>
      </li>
    </div>
  );
}
