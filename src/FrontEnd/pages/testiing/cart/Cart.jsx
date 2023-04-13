import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { clearErrors_cartDetails, getCartDetails } from "../../../store/action/cartAction";
import './cart.css';
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

  return (
    <>
      <div className="custom-container px-5">
        <h1 className="text-center py-4">Shopping Cart</h1>
        <div className="project">
          <div className="shop">
            {
              cart?.cartData?.map((value, index) => {
                return (
                  <SingleCartItem key={index} value={value} qty={value?.items?.quantity} />
                )
              })
            }
          </div>
          <div className="p-4 right-bar">
            <div>
              <h3 className="fs-5 pb-3">Payment summary</h3>
            </div>
            <p className="d-flex justify-content-between">
              <span>Item total</span> <span> <span>&#8377; </span>{cart?.subTotal}</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Taxes and Fee(5%)</span> <span><span>&#8377; </span>{ (cart?.subTotal)? Math.round(cart?.subTotal * 5 / 100) : 0}</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Minimum Order Fee</span> <span><span>&#8377; </span>60</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Total</span> <span><span>&#8377; </span>{(cart?.subTotal) + ((cart?.subTotal)? Math.round(cart?.subTotal * 5 / 100) : 0) + 60}</span>
            </p>
            {/* <a href="#"> */}
            <Link to={"/checkout?category=" + category}>
              <i className="fa fa-shopping-cart"></i>Checkout
            </Link>
            {/* </a> */}
          </div>
        </div>
      </div>
      {(loading)? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : null }
    </>
  );
};

export default Cart;
