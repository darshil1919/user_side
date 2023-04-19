import React, { useEffect, useState } from "react";
import { getCartDetails, updateCart } from "../../../store/action/cartAction";
import { useSearchParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

const SingleCartItem = ({value, qty}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(qty);
  const {loading} = useSelector((state) => state.cartOperation)

  useEffect(() => {
    if (qty) {
      setQuantity(qty);
    }
  }, [qty, dispatch])

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      console.log("quantity decrease ==>>>", newQuantity)
      setQuantity(newQuantity);
    }
    // onDecrease(newQuantity);
    const payload = {
      categoryName: category,
      subCategoryId: value.items.subCategoryId,
      serviceId: value.items.serviceId,
      quantity: quantity - 1,
    };

    dispatch(updateCart(payload));
    setTimeout(() => {
      dispatch(getCartDetails({ categoryName: category }));
    }, 200)
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    console.log("quantity increase ==>>>", newQuantity)
    setQuantity(newQuantity);
    // onIncrease(newQuantity);
    const payload = {
      categoryName: category,
      subCategoryId: value.items.subCategoryId,
      serviceId: value.items.serviceId,
      quantity: quantity + 1,
    };

    dispatch(updateCart(payload));
    setTimeout(() => {
      dispatch(getCartDetails({ categoryName: category }));
    }, 200)
  };

  return (
    <>
      <div className="d-flex flex-column flex-sm-row my-4 p-4 p-sm-0 box">
        <div className="text-center text-sm-start img-div">
          <img src={`/image/serviceImages/${value.serviceData[0].image}`} />
        </div>
        <div className="content">
          <div className="d-flex justify-content-between">
            <h3 className="fs-4">{value.serviceData[0].serviceName}</h3>
            <p className="text-danger mb-0">
              <i aria-hidden="true" className="fa fa-trash"></i>
            </p>
          </div>
          <h4 className="fs-4 text-start ms-0 mt-0">
          <span>&#8377; </span>
            {value.serviceData[0].price * value.items.quantity}
          </h4>
          <div className="unit">
          {quantity < 0 ? (
              <button
                className="btn fs-4 fw-bold cart-item_add-btn"
                onClick={handleIncrease}
              >
                <span className="">Add</span>
              </button>
            ) : (
              <div className="d-flex justify-content-between align-items-center fs-4 fw-bold cart-item_quantity">
                <button
                  className="btn cart-item_quantity-btn"
                  onClick={handleDecrease}
                >
                  <FaMinus fill={"gray"} />
                </button>
                <span className="cart-item_quantity-value">{quantity}</span>
                <button
                  className="btn cart-item_quantity-btn"
                  onClick={handleIncrease}
                >
                  <FaPlus fill={"gray"} />
                </button>
              </div>
            )}
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

export default SingleCartItem;
