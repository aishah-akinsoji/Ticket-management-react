import React, { useState, useEffect } from 'react'
import { LogOut } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Dashboard = ({ displayToast, onLogout }) => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = currentUser.uname
  const userSpaceIndex = user.indexOf(' ');
  const userName = user.slice(0, userSpaceIndex);
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status?.toLowerCase() === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status?.toLowerCase() === "in progress").length;
  const resolvedTickets = tickets.filter((t) => t.status?.toLowerCase() === "resolved").length;
  useEffect(() => {
  const sessionActive = sessionStorage.getItem("isAuthenticated");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || sessionActive !== "true") {
    navigate("/auth/login");
    return;
  }

  // your existing axios fetch here
}, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
      return;
    }
    axios
      .get(`http://localhost:8000/users/${currentUser.id}`)
      .then((res) => {
        setTickets(res.data.tickets || []);
      })
      .catch(() => displayToast("Failed to fetch tickets", "error"));
  }, []);
  const handleLogout = () => {
    displayToast("Logged out successfully", "success");
    onLogout();
    setTimeout(() => navigate("/"), 1000);
  };

  const summary = [
    { icon: <i className="fa-solid fa-ticket"></i>, title: "Total tickets", color: "blue", no: totalTickets },
    { icon: <i className="fa-solid fa-circle-exclamation"></i>, title: "Open tickets", color: "green", no: openTickets },
    { icon: <i className="fa-solid fa-spinner"></i>, title: "In progress", color: "orange", no: inProgressTickets },
    { icon: <i className="fa-solid fa-circle-check"></i>, title: "Resolved", color: "grey", no: resolvedTickets },
  ];

  return (
    <div className='dashboard'>
      <header className='navbar navbar-expand-lg'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <div className='logo'>
              <img src='fixMate-logo-transparent.png' alt="FixMate Logo"/>
            </div>
            <div>
              <p>Welcome, {userName}</p>
            </div>
            <div className='d-flex gap-3'>
              <button className='coloured-btn' onClick={() => navigate("/tickets")}>View all your tickets</button>
              <button className='logout rounded-3' onClick={handleLogout}>
                <LogOut className="w-4 h-4"/>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className='tickets d-flex align-items-center justify-content-center'>
        <div className='container'>
          <div className='row gap-3 py-4 align-items-center justify-content-center'>
            {summary.map((stat, index) => (
              <div key={index} className='card-hover col-sm-12 col-md-3 d-flex justify-content-center p-4 align-items-start border-0 gap-2 card shadow-lg rounded-4'>
                <div className='stat-icon text-white p-2 d-flex justify-content-center align-items-center' style={{backgroundColor: stat.color, fontSize: "1.5rem"}}>
                  {stat.icon}
                </div>
                <div className='lead'>{stat.title}</div>
                <div className='fs-5 fw-bold' style={{color: stat.color}}>{stat.no}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
