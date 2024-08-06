import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BooksDetails from "./components/BooksDetails";
import BooksDetailsAdmin from "./components/BooksDetailsAdmin";
import AddBooks from "./components/AddBooks";
import EditBook from "./components/EditBook";
import Cart from './components/Cart';
import AdminPanel from "./components/AdminPanel";

const Signup = lazy(() => import("./components/signup.jsx"));
const Login = lazy(() => import("./components/login.jsx"));
const User = lazy(() => import("./components/User.jsx"));
const Admin = lazy(() => import("./components/Admin.jsx"));

function App() {

  let auth 
  if(localStorage.getItem("auth") !== null){
    auth=JSON.parse(localStorage.getItem("auth"));
  }
  return (
    <>
      <Suspense
        fallback={
          <div className="w-100 h-100 text-center mt-1">
            {" "}
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            {["Signup", "/"].map((path, index) => (
              <Route path={path} element={<Signup />} key={index}></Route>
            ))}
            <Route path="login" element={<Login />}></Route>
            <Route path='admin' element={ auth ? <Admin /> : <Login />}></Route>
            <Route path="admin/book/:id" element={auth ?<BooksDetailsAdmin />: <Login />} />
            <Route path="admin/add" element={auth ?<AddBooks />: <Login />} />
            <Route path="/edit/:id" element={auth ?<EditBook />: <Login />} />
            <Route path="users/edit" element={auth ?<AdminPanel />: <Login />} />
            <Route path="user" element={auth ?<User />: <Login />}></Route>
            <Route path="user/book/:id" element={auth ?<BooksDetails />: <Login />} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
