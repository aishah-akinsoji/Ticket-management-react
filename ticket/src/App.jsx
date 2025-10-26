import { useState, useEffect } from "react";
import { LandingPage } from "./LandingPage.jsx";
import { AuthPage } from "./AuthPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { TicketManagement } from "./TicketManagement.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toast } from "./Toast";
import { Footer } from "./Footer.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState({
    display: false,
    message: "",
    type: "",
  });

  // 🔹 check session on page load
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("isAuthenticated");
    if (sessionUser === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const displayToast = (message, type) => {
    setToast({ display: true, message, type });

    setTimeout(() => {
      setToast({ display: false, message: "", type: "" });
    }, 3000);
  };

  // 🔹 on login: set session
  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  // 🔹 on logout: clear session
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.clear(); // optional: clears all session data
  };

  return (
    <BrowserRouter>
      <Toast toastDisplay={toast} />
      <Routes>
        <Route path="/" element={<><LandingPage isAuthenticated={isAuthenticated} /> <Footer isAuthenticated={isAuthenticated}/></>} />
        <Route
          path="/auth/login"
          element={<AuthPage mode="login" displayToast={displayToast} onLogin={handleLogin} />}
        />
        <Route
          path="/auth/signup"
          element={<AuthPage mode="signup" displayToast={displayToast} onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? 
            <>
              <Dashboard displayToast={displayToast} onLogout={handleLogout} />
              <Footer isAuthenticated={isAuthenticated}/>
            </>
             : null
          }
        />
        <Route
          path="/tickets"
          element={
            isAuthenticated ? 
            <>
              <TicketManagement displayToast={displayToast} onLogout={handleLogout} />
              <Footer isAuthenticated={isAuthenticated}/>
            </>
             : null
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
