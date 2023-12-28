import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { io } from "socket.io-client";
//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SocketContext from "./context/sendContext";
//socket io

const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <SocketContext.Provider value={socket} >
      <Router>
        <Routes>
            {/* <Route path="/" element={token ? <Home socket={socket} /> : <Navigate to="/login" /> } /> */}
            <Route path="/" element={token ? <Home socket={socket} /> : <Navigate to="/login" /> } />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </Router>
      </SocketContext.Provider>
  </div>
  );
}

export default App;
