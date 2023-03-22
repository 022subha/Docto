import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function Home({ username, setUsername }) {
  return (
    <div className="body">
      <Navbar username={username} setUsername={setUsername} />
    </div>
  );
}
