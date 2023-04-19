import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  clearErrors_cartDetails,
  getCartDetails,
} from "../../../store/action/cartAction";
import "./cart.css";
import SingleCartItem from "./SingleCartItem";
import { Backdrop, CircularProgress } from "@mui/material";

const Cart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);

  const { error, loading, cart } = useSelector((state) => {
    return state.cartDetails;
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors_cartDetails());
    }

    dispatch(getCartDetails({ categoryName: category }));
  }, []);

  // if(!cart?.cartData){
  //   return (
  //   <>
  //     <h1>cart is empty</h1>
  //     <Link className="btn btn-primary" to={"/view?category=" + category}>Explore Services</Link>
  //   </>
  //   )
  // }
  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : cart?.cartData?.length > 0 ? (
    <>
      {console.log("cart items length -->>>", cart?.cartData?.length)}
      <div className="custom-container px-5">
        <h2 className="text-center py-4 fs-1">Shopping Cart</h2>
        <div className="project">
          <div className="shop">
            {cart?.cartData?.map((value, index) => {
              return (
                <SingleCartItem
                  key={index}
                  value={value}
                  qty={value?.items?.quantity}
                />
              );
            })}
          </div>
          <div className="p-4 right-bar">
            <div>
              <h3 className="fs-2 mb-0 pb-3">Payment summary</h3>
            </div>
            <p className="d-flex justify-content-between">
              <span>Item total</span>{" "}
              <span>
                {" "}
                <span>&#8377; </span>
                {cart?.subTotal}
              </span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Taxes and Fee(5%)</span>{" "}
              <span>
                <span>&#8377; </span>
                {cart?.subTotal ? Math.round((cart?.subTotal * 5) / 100) : 0}
              </span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Minimum Order Fee</span>{" "}
              <span>
                <span>&#8377; </span>60
              </span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Total</span>{" "}
              <span>
                <span>&#8377; </span>
                {cart?.subTotal +
                  (cart?.subTotal
                    ? Math.round((cart?.subTotal * 5) / 100)
                    : 0) +
                  60}
              </span>
            </p>
            {/* <a href="#"> */}
            <Link to={"/checkout?category=" + category}>
              <span className="fs-4 text-white">Checkout</span>
            </Link>
            {/* </a> */}
          </div>
        </div>
      </div>
      {/* {(loading)? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : null } */}
    </>
  ) : (
    <>
      {/* <h1>cart is empty</h1> */}
      <img
        src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
        alt=""
      />
      <Link className="btn btn-primary" to={"/view?category=" + category}>
        Explore Services
      </Link>
    </>
  );
};

export default Cart;
