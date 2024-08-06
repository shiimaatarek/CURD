import axios from "axios";
import { useEffect,  useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Books() {
  const state = useSelector((state)=>state.handelCart)
  let auth = 0
  if(localStorage.getItem("auth") !== null){
    auth=JSON.parse(localStorage.getItem("auth"));
  }
  const delMyAccount = async(id)=>{
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3004/all/${id}`)
        localStorage.removeItem("auth")
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        setTimeout(() => {
          window.location.reload()
        }, 1500);
          }
        })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "An error occurred while deleting the user.", "error");
          });
      
    }
  
  const [books, setbooks] = useState([]);
  let Data = () => {axios.get("http://localhost:3004/books").then((res) => setbooks(res.data))};
  useEffect(() => {
    if (books.length === 0) {
      Data();
    }
  }, [books]);

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
        <div className="d-flex justify-content-end ">
          <button className="btn btn-outline-dark me-2 mb-3" onClick={handleEvent}>Sort by Title</button>
          <button className="btn btn-outline-dark me-2 mb-3" onClick={()=>delMyAccount(auth.id)}>Delete my account</button>
          <Link to='/cart' className="btn btn-outline-dark ms-3 mb-3">
            <span className="fa fa-shopping-cart me-1"></span> Cart({state.length})
        </Link>
        </div>
        <div className="boxes">
          {books.map((book) => (
            <Card key={book.id} className="card">
              <Card.Img variant="top" src={book.cover_image} className="img" />
              <Card.Body className="card-body">
                <Card.Title className="header">{book.title}</Card.Title>
              </Card.Body>
              <Card.Body className="card-body">
                <Link  className="btn bg-warning"  to={`./book/${book.id}`}>Details</Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Books;
