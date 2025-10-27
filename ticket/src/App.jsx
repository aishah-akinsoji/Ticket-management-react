import { useState, useEffect } from "react"
import { LandingPage } from "./LandingPage.jsx";
import { AuthPage } from "./AuthPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { TicketManagement } from "./TicketManagement.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toast } from './Toast'
import { Footer } from './Footer'

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState({
    display: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  const displayToast = (message, type) => {
    setToast({ ...toast, display: true, message: message, type: type });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("currentUser");
  };

  return (
    <BrowserRouter>
      <Toast toastDisplay={toast}/>
      <Routes>
        <Route path="/" element={<><LandingPage isAuthenticated={isAuthenticated}/><Footer isAuthenticated={isAuthenticated}/></>}/>
        <Route path="/auth/login" element={<AuthPage mode="login" displayToast={displayToast} onLogin={handleLogin}/>}/>
        <Route path="/auth/signup" element={<AuthPage mode="signup" displayToast={displayToast} onLogin={handleLogin}/>}/>
        <Route path="/dashboard" element={isAuthenticated ? <><Dashboard displayToast={displayToast} onLogout={handleLogout}/><Footer isAuthenticated={isAuthenticated}/></> : null}/>
        <Route path="/tickets" element={isAuthenticated ? <><TicketManagement displayToast={displayToast} onLogout={handleLogout}/><Footer isAuthenticated={isAuthenticated}/></> : null}/>
      </Routes>
    </BrowserRouter>
  )
}
