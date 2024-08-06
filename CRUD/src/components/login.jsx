import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {
  //   const[ email ,setMail ]=useState('')
  const [name, setName] = useState("");
  const [password, setPass] = useState("");

  let data;
  const Login = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .get(`http://localhost:3004/all`)
        .then((res) => {
          data = res.data.find((u) => u.name === name);

          console.log("Result=> " + res);
          if (res.name === "") {
            alert("Invalid Information");
          } else if (
            data.password === password &&
            data.name === name &&
            data.name === "Admin"
          ) {
            alert("Perfecto,Admin Login Successfully !");
            localStorage.setItem("auth", JSON.stringify(data));
            window.location.href = "/admin";
          } else {
            if (data.password === password && data.name === name) {
              alert("Perfecto,User Login Successfully !");
              localStorage.setItem("auth", JSON.stringify(data));
              window.location.href = "/user";
            }
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (name === "" || name === null) {
      result = false;
      alert("please, enter Ur info !");
    }
    if (password === "" || password === null) {
      result = false;
      alert("please, enter Ur password !");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6 " style={{ marginTop: "100px" }}>
        <form onSubmit={Login} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Login Page</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  {" "}
                  User Name <span className=" text-danger">*</span>{" "}
                </label>
                <input
                  type="text"
                  value={name}
                  id="email"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>
                  {" "}
                  password <span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
              <Link to="/signup" className="ms-3">
                {" "}
                Don't have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
