import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { io } from "socket.io-client";
//pages
// import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import SocketContext from "./context/sendContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, lazy, Suspense} from "react";
import PageLoad from "./components/chat/Welcome/PageLoad";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/lazyLoad/ErrorFallback";

const Home = lazy(() => import('./pages/home'));
console.log("this is process", process.env.REACT_APP_API_ENDPOINT);
//socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const { user, theme } = useSelector((state) => state.user);
  const { token } = user;
  const [isOnline, setIsOnline ] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }

  }, []);

  !isOnline && toast.error("You are offline. Please check your network connection.")
  return (
    <div className={theme}>
      <SocketContext.Provider value={socket} >
      <ToastContainer />
      <Router>
      
        <Routes>
           
            <Route path="/" element={token ? 
            <ErrorBoundary 
              FallbackComponent={ErrorFallback}
              onReset={() => <Navigate to="/" />} >
                <Suspense fallback={<PageLoad />} >
                  <Home socket={socket} />
                </Suspense>
            </ErrorBoundary>
            
            : <Navigate to="/login" /> } />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </Router>
      </SocketContext.Provider>
  </div>
  );
}

export default App;
