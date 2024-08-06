import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {delCart} from "./redux/action/index";
import { NavLink } from "react-router-dom";


const Cart =()=>{
    const state = useSelector((state)=>state.handelCart)
    const dispatch =useDispatch()

    const handelClose =(item)=>{
        dispatch(delCart(item))
    }

    const cartItems =(cartItem) =>{
        return (
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={()=>handelClose(cartItem)}  className="btn-close float-end"aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.cover_image} alt={cartItem.title} height="200px" width="180px"/>
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.title}</h3>
                            <p className=" lead fw-bold">{cartItem.code}</p>
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
    const emptyCart =()=>{
        return(
            <div className="px-4 my-5 bg-light rounded-3" >
            <div className="container py-4">
                <div className="row">
                    <h3>Empty Cart ...!</h3>
                </div>



                </div>
                </div>

        )
    }

    const button = ()=>{
        return(
            <div className="container">
                <div className="row">
                    <NavLink to="/user" className="btn btn-outline-dark mb-5 w-25 mx-auto" >Go Back</NavLink>
                </div>
            </div>
        )
    }

        return(

            <>
              {state.length === 0 && emptyCart()}
              {state.length !== 0 && state.map(cartItems)} 
              {state.length !== 0 && button()}    
            </>

        )

    }


export default Cart;
