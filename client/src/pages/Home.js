import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home({ username, setUsername }) {
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/userData",
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="body">
      <Navbar username={username} setUsername={setUsername} />
    </div>
  );
}
