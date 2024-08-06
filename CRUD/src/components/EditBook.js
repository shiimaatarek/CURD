import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    professor: "",
    code: "",
    cover_image: "",
  });

  const [ setIsEditing] = useState(false); 

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/admin");
      });
  }, [id, navigate]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3004/books/${id}`, book)
      .then((res) => {
        console.log(res.data);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark"> 
        <Container>
          <Navbar.Brand>Edit Item</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/admin")}>Back Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <div className="form_edit-content" style={{ marginTop: "20px" }}>
          <form onSubmit={handleEdit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                value={book.title}
                onChange={handleChange}
              />
              <label htmlFor="title">Book Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="professor"
                placeholder="Professor"
                name="professor"
                value={book.professor}
                onChange={handleChange}
              />
              <label htmlFor="professor">Product Professor</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Code"
                name="code"
                value={book.code}
                onChange={handleChange}
              />
              <label htmlFor="code">Product Code</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="cover_image"
                placeholder="Image"
                name="cover_image"
                value={book.cover_image}
                onChange={handleChange}
              />
              <label htmlFor="cover_image">Book Image</label>
            </div>
            <button className="btn btn-dark">Done</button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default EditBook;
