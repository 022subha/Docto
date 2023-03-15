import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";

function App() {
  const [username, setUsername] = useState(null);
  const { loading } = useSelector((state) => state.alerts);
  useEffect(() => {
    const token = Cookies.get("token");
    setUsername(token);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home username={username} setUsername={setUsername} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
