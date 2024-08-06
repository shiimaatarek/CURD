import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../App.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Books() {
  const [books, setbooks] = useState([]);
  let Data = () => {
    axios.get("http://localhost:3004/books").then((res) => setbooks(res.data));
  };
  useEffect(() => {
    if (books.length === 0) {
      Data();
    }
  }, [books]);

  let delBook = (book) => {
    Swal.fire({
      title: `Are you sure to delete (${book.title}) ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:3004/books/${book.id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        Data();
      }
    });
  };

  let handleEvent = () => {
    books.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
    });
    setbooks([...books]);
  }

  return (
    <section className="get_books">
      <Container>
        <div className="d-flex justify-content-start mb-4">
          <Link to={"./add"} className="btn add-btn">
            Add New
          </Link>
          <Link to={"/users/edit"} className="btn add-btn">
            Users
          </Link>
        </div>
        <div className="d-flex justify-content-end ">
          <button className="btn sort-btn" onClick={handleEvent}>Sort by Title</button>
        </div>
        <div className="boxes">
          {books.map((book) => (
            <Card key={book.id} className="card">
              <Card.Img variant="top" src={book.cover_image} className="img" />
              <Card.Body className="card-body">
                <Card.Title className="header">{book.title}</Card.Title>
              </Card.Body>
              <Card.Body className="card-body">
                <Link className="btn bg-warning" to={`book/${book.id}`}>
                  Details
                </Link>
                <button
                  className="btn bg-danger ms-2"
                  onClick={() => delBook(book)}
                >
                  Delete
                </button>
                <Link
                  className="btn bg-success ms-2"
                  to={`/edit/${book.id}`}
                >
                  Edit
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Books;
