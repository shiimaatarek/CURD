import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../stylee/AdminPanel.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3004/all")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3004/all/${userId}`)
          .then(() => {
            setUsers(users.filter((user) => user.id !== userId));
            setFilteredUsers(
              filteredUsers.filter((user) => user.id !== userId)
            );
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  const filterUsersByEmail = (searchTerm) => {
    const filteredResults = users.filter((user) => {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredResults);
  };

  const handleEmailSearchChange = (event) => {
    const searchTerm = event.target.value;
    filterUsersByEmail(searchTerm);
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Panel - User Management</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/admin")}>Back Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <input
          type="text"
          placeholder="Search by email"
          onChange={handleEmailSearchChange}
        />
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default AdminPanel;
