// AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function AuthPage({ mode, onLogin, displayToast }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
    tickets: [],
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let validationMessage = {
      email: "",
      password: "",
    };

    const emailValid = /\S+@\S+\.\S+/.test(loginData.email);
    const passwordDigitValid = /[0-9]/.test(loginData.password);
    const passwordSymbolValid = /[!@#$%^&*(),.\-_"?:{}|<>]/.test(loginData.password);
    const passwordLetterValid = /[A-Za-z]/.test(loginData.password);

    if (!loginData.email.trim() || !emailValid) {
      isValid = false;
      validationMessage.email = "Please enter a valid email address.";
    }

    if (loginData.password.length < 12) {
      isValid = false;
      validationMessage.password = "Password must be at least 12 characters long.";
    } else if (!passwordDigitValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one digit.";
    } else if (!passwordSymbolValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one symbol.";
    } else if (!passwordLetterValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one letter.";
    }

    if (!isValid) {
      setErrors(validationMessage);
      return;
    }

    axios.get("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users")
      .then(result => {
        const user = result.data.find(user => user.email === loginData.email);

        if (!user) {
          isValid = false;
          validationMessage.email = "Account does not exist. Try signing in";
        } else if (user.password !== loginData.password) {
          isValid = false;
          validationMessage.password = "Wrong password";
        } else {
          localStorage.setItem("currentUser", JSON.stringify(user));
          displayToast("Login successful", "success");
          onLogin();
          navigate("/dashboard");
        }
        setErrors(validationMessage);
      })
      .catch(() => displayToast("Authentication failed", "error"));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let validationMessage = {
      uname: "",
      email: "",
      password: "",
      cpassword: "",
    };

    const unameValid = /^[A-Za-z ]+$/.test(formData.uname.trim());
    const emailValid = /\S+@\S+\.\S+/.test(formData.email);
    const passwordDigitValid = /[0-9]/.test(formData.password);
    const passwordSymbolValid = /[!@#$%^&*(),.\-_"?:{}|<>]/.test(formData.password);
    const passwordLetterValid = /[A-Za-z]/.test(formData.password);

    if (!formData.uname.trim() || !unameValid || formData.uname.length < 3) {
      isValid = false;
      validationMessage.uname = "Please enter a correct full name.";
    }

    if (!formData.email.trim() || !emailValid) {
      isValid = false;
      validationMessage.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 12) {
      isValid = false;
      validationMessage.password = "Password must be at least 12 characters long.";
    } else if (!passwordDigitValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one digit.";
    } else if (!passwordSymbolValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one symbol.";
    } else if (!passwordLetterValid) {
      isValid = false;
      validationMessage.password = "Password must contain at least one letter.";
    }

    if (formData.cpassword !== formData.password) {
      isValid = false;
      validationMessage.cpassword = "Passwords do not match.";
    }
    setErrors(validationMessage);

    if (!isValid) return;

    axios.get("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users")
      .then(result => {
        const exists = result.data.some(user => user.email === formData.email);

        if (exists) {
          validationMessage.email = "There is already an account with this email. Try logging in.";
          setErrors(validationMessage);
          displayToast("An account already exists with this email", "error");
        } else {
          axios.post("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users", formData)
            .then((result) => {
              displayToast("Account created successfully", "success");
              onLogin();
              navigate("/dashboard");
            })
            .catch(() => displayToast("Authentication failed", "error"));
        }
      })
      .catch(() => displayToast("An error occurred", "error"));
  };

  return (
    <div className="auth-page position-relative">
      <div className="container">
        <div className="d-flex justify-content-center gap-3 flex-column align-items-center">
          <button className="back border-0 mt-4" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i> Back to home
          </button>
          <div className="login-card card border-0 align-items-center justify-content-center rounded-4 px-5 pb-4">
            <div className="logo">
              <img src="/fixMate-logo-transparent.png" alt="FixMate Logo"/>
            </div>
            <h1 className="text-center">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-center mb-5">{mode === "login" ? "Login to access your dashboard" : "Sign up to get started"}</p>
            <form className="d-flex flex-column gap-3 w-100">
              {mode === "login" ? null : (
                <div className="name d-flex flex-column">
                  <label htmlFor="username">Full Name</label>
                  <input id="username" type="text" onChange={(e) => setFormData({...formData, uname: e.target.value})} required/>
                  <span className="text-danger">{errors.uname}</span>
                </div>
              )}
              <div className="email d-flex flex-column">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(e) => mode === "login" ? setLoginData({...loginData, email: e.target.value}) : setFormData({...formData, email: e.target.value})} required/>
                <span className="text-danger">{errors.email}</span>
              </div>
              <div className="password d-flex flex-column">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={(e) => mode === "login" ? setLoginData({...loginData, password: e.target.value}) : setFormData({...formData, password: e.target.value})} required/>
                <span className="text-danger">{errors.password}</span>
              </div>
              {mode === "login" ? null : (
                <div className="cpassword d-flex flex-column">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input id="cpassword" type="password" onChange={(e) => setFormData({...formData, cpassword: e.target.value})} required/>
                  <span className="text-danger">{errors.cpassword}</span>
                </div>
              )}
              {mode === "login" ? 
                <button className="coloured-btn" onClick={handleLoginSubmit}>Login</button> : 
                <button className="coloured-btn" onClick={handleSubmit}>Sign Up</button>
              }
            </form>
            {mode === "login" ? 
              <p className="mt-3">
                Don't have an account? <span className="toggle-link" onClick={() => navigate("/auth/signup")}>Sign Up</span>
              </p> : 
              <p className="mt-3">
                Already have an account? <span className="toggle-link" onClick={() => navigate("/auth/login")}>Login</span>
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
