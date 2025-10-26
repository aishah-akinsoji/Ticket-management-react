import { useState, useEffect } from "react"
import { LandingPage } from "./LandingPage.jsx";
import { AuthPage } from "./AuthPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { TicketManagement } from "./TicketManagement.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toast } from './Toast'

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState({
    display: false,
    message: "",
    type: "",
  });

  // Check sessionStorage on load
  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  const displayToast = (message, type) => {
    setToast({ display: true, message, type });

    setTimeout(() => {
      setToast({ display: false, message: "", type: "" });
    }, 3000);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("currentUser"); // remove user data on logout
  };

  return (
    <BrowserRouter>
      <Toast toastDisplay={toast}/>
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated}/>}/>
        <Route path="/auth/login" element={<AuthPage mode="login" displayToast={displayToast} onLogin={handleLogin}/>}/>
        <Route path="/auth/signup" element={<AuthPage mode="signup" displayToast={displayToast} onLogin={handleLogin}/>}/>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard displayToast={displayToast} onLogout={handleLogout}/> : null}/>
        <Route path="/tickets" element={isAuthenticated ? <TicketManagement displayToast={toast} onLogout={handleLogout}/> : null}/>
      </Routes>
    </BrowserRouter>
  )
}
