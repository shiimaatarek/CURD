import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { addCart } from "./redux/action";
import "../App.css";

function BooksDetails() {
  const [book, setbook] = useState([]);
  let { id } = useParams();
  const dispatch= useDispatch();
  const addBook =(book)=>{
        dispatch(addCart(book));
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${id}`)
      .then((res) => setbook(res.data))
      .then ((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <Container>
      <div className="main_content">
        <div className="bg_img">
          <img src={book.cover_image} alt="img" />
        </div>
        <div className="bg_gradient"></div>
        <div className="card_details" key={book.id}>
          <Row className="d-flex justify-around">
            <Col sm={12} md={2}>
              <img
                src={book.cover_image}
                alt={book.title}
                className="img_details"
              />
            </Col>
            <Col sm={12} md={9}>
              <h2>{book.title}</h2>
              <h5>{book.subTitle}</h5>
              <h6>Professor : {book.professor}</h6>
              <h6>Code : {book.code}</h6>
              <p>{book.description}</p>
              <button className="btn btn-outline-light px-4 py-2" onClick={()=>addBook(book)}>Add To Cart</button>
              <Link to="/cart" className="btn btn-outline-light ms-2 px-3 py-2">Go To Cart</Link>
              <Link className="btn btn-outline-light ms-2" to={"/user"}>
                Back Home
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default BooksDetails;
