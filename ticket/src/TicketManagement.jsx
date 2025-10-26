import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

export const TicketManagement = ({ displayToast, onLogout }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({ title: "", description: "", status: "Open", priority: "Medium" });
  const [editingTicket, setEditingTicket] = useState(null);
  const [deletingTicket, setDeletingTicket] = useState(null);
  const [errors, setErrors] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
  if (!currentUser) {
    navigate("/auth/login");
    return;
  }
  axios.get(`http://localhost:8000/users/${currentUser.id}`)
    .then(res => setTickets(res.data.tickets))
    .catch(() => displayToast("Failed to fetch tickets", "error"));
}, [currentUser, navigate]);

  const handleLogout = () => {
    displayToast("Logged out successfully", "success");
    onLogout()
    navigate("/")
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let validationMessage = {
      title: "",
      description: ""
    }
    if (!ticketForm.title.trim()) {
      displayToast("Title cannot be empty", "error");
      validationMessage.title = "Title cannot be empty";
    }
    if (!ticketForm.description.trim()) {
      displayToast("Description cannot be empty", "error");
      validationMessage.description = "Description cannot be empty";
    }

setErrors(validationMessage);
if (validationMessage.title || validationMessage.description) return;
    axios.get(`http://localhost:8000/users/${currentUser.id}`)
    .then((res) => {
      const user = res.data;
      let updatedTickets;

      if (editingTicket) {
        updatedTickets = user.tickets.map((t) =>
          t.id === editingTicket.id ? { ...editingTicket, ...ticketForm } : t
        );
        displayToast("Ticket updated successfully!", "success");
      } else {
        const newTicket = {
          id: Math.random().toString(16).slice(2, 6),
          ...ticketForm,
        };
        updatedTickets = [...user.tickets, newTicket];
        displayToast("Ticket created successfully!", "success");
      }
      axios.patch(`http://localhost:8000/users/${currentUser.id}`, { tickets: updatedTickets })
        .then(() => {
          setTickets(updatedTickets);
          setModalOpen(false);
          setEditingTicket(null);
          setTicketForm({ title: "", description: "", status: "Open", priority: "Medium" });
        })
        .catch(() => displayToast("Failed to update tickets", "error"));
    })
    .catch(() => displayToast("Failed to fetch user data", "error"));
  };
  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
    setTicketForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
    setModalOpen(true);
  };
  const handleSelected = (id) => {
    axios.get(`http://localhost:8000/users/${currentUser.id}`)
      .then((res) => {
        const user = res.data;
        const selectedTicket = user.tickets.find((t) => t.id === id);
        setDeletingTicket(selectedTicket);
        setDeleteConfirmation(true);
      })
      .catch(() => displayToast("Failed to fetch user data", "error"));
  }
  const handleDelete = (id) => {
    axios.get(`http://localhost:8000/users/${currentUser.id}`)
      .then((res) => {
        const user = res.data;
        const updatedTickets = user.tickets.filter((t) => t.id !== id);

        axios.patch(`http://localhost:8000/users/${currentUser.id}`, { tickets: updatedTickets })
          .then(() => {
            setTickets(updatedTickets);
            displayToast("Ticket deleted successfully!", "success");
            setDeleteConfirmation(false)
          })
          .catch(() => displayToast("Failed to delete ticket", "error"));
      })
      .catch(() => displayToast("Failed to fetch user data", "error"));
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingTicket(null);
    setTicketForm({ title: "", description: "", status: "Open", priority: "Medium" });
  };

  return (
    <div className="ticket-management">
      <header className='navbar navbar-expand-lg'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <div className='logo'>
              <img src='fixMate-logo-transparent.png' alt="FixMate Logo"/>
            </div>
            <div className='d-flex gap-3'>
              <button className='coloured-btn' type="button" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
              <button className='logout rounded-3' type="button" onClick={handleLogout}>
                <LogOut className="w-4 h-4"/>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className='tickets d-flex justify-content-center'>
        <div className='container d-flex flex-column align-items-center gap-3'>
          <button className="coloured-btn" type="button" onClick={() => setModalOpen(true)}>
            <i className="fa-solid fa-plus"></i> Create a new ticket
          </button>
          {
            tickets.length === 0 ? 
            <div className="no-tickets d-flex flex-column justify-content-center align-items-center h1 mt-4">
              <i className="fa-solid fa-ticket"></i>
              <p>No tickets available</p>
            </div> :
            <div className='row gap-3 py-4 align-items-center justify-content-center w-100'>
              {tickets.map(ticket => (
                <div key={ticket.id} className='col-sm-12 col-md-4 border-0 card p-3 shadow-lg rounded-4 d-flex flex-column gap-2'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h5>{ticket.title}</h5>
                    <div className="d-flex gap-2">
                      <button className="ticket-btn" onClick={() => handleEditClick(ticket)}><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="ticket-btn" onClick={() => handleSelected(ticket.id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                  <p>{ticket.description}</p>
                  <div className='d-flex justify-content-between'>
                    <span className="ticket-status p-1 rounded-3" style={{backgroundColor: ticket.status === "Open" ? "rgba(0, 109, 0, 0.363)" : ticket.status === "In Progress" ? "rgba(255, 166, 0, 0.473)" : "rgba(128, 128, 128, 0.336)"}}>{ticket.status}</span>
                    <span className="ticket-priority p-1 rounded-3" style={{backgroundColor: ticket.priority === "Low" ? "rgba(131, 139, 131, 0.36)" : ticket.priority === "Medium" ? "rgba(0, 119, 255, 0.47)" : "rgba(255, 0, 0, 0.34)"}}>{ticket.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </main>
      <CModal
        alignment="center"
        scrollable
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        backdrop="static"
        aria-labelledby="VerticallyCenteredScrollableExample2"
        aria-hidden={false}
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">
            {editingTicket ? "Edit Ticket" : "Create new ticket"}
            <p className="small fw-normal">Fill in the details below.</p>
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <form className="d-flex flex-column gap-3">
            <div className="title d-flex flex-column">
              <label htmlFor="title" className="fw-bold" required>Title *</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={ticketForm.title}
                onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                required
              />
              <span style={{color: "red"}}>{errors.title}</span>
            </div>
            <div className="description d-flex flex-column">
              <label htmlFor="description" className="fw-bold">Description *</label>
              <textarea
                id="description"
                placeholder="Description"
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                required
              />
              <span style={{color: "red"}}>{errors.description}</span>
            </div>
            <div className="status d-flex flex-column">
              <label className="fw-bold">Status *</label>
              <select
                value={ticketForm.status}
                onChange={(e) => setTicketForm({ ...ticketForm, status: e.target.value })}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="priority d-flex flex-column">
              <label className="fw-bold">Priority</label>
              <select
                value={ticketForm.priority}
                onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </form>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={handleCancel}>Close</CButton>
          <button className="coloured-btn" onClick={handleFormSubmit}>
            {editingTicket ? "Update Ticket" : "Create Ticket"}
          </button>
        </CModalFooter>
      </CModal>
      <CModal
                    alignment="center"
                    scrollable
                    visible={deleteConfirmation}
                    onClose={() => setDeleteConfirmation(false)}
                    backdrop="static"
                    aria-labelledby="confirmation"
                    aria-hidden={false}
                  >
                    <CModalHeader>
                      <CModalTitle id="confirmation">
                        Delete confirmation
                        <p className="small fw-normal">Do you want to delete this ticket?</p>
                      </CModalTitle>
                    </CModalHeader>

                    <CModalBody>
                      <p>This action cannot be undone. This will parmanently delete the ticket "{deletingTicket?.title}"</p>
                    </CModalBody>

                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setDeleteConfirmation(false)}>Close</CButton>
                      <button className="bg-danger border-0 rounded-3" onClick={() => deletingTicket && handleDelete(deletingTicket.id)}>
                        Delete
                      </button>
                    </CModalFooter>
                  </CModal>
    </div>
  );
};
