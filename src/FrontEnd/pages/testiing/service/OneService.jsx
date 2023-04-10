import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import Details from "./Details";
import "./style.css";
import {
  clearErrors_cartOperation,
  getCartDetails,
  getServiceCartDetails,
  updateCart,
} from "../../../store/action/cartAction";

const OneService = ({ item, qty }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { error, loading, addedMsg } = useSelector((state) => {
    return state.cartOperation;
  });
  // const serviceCartDetail = useSelector((state) => {
  //   // console.log(state.cartDetails.cart.filter((value) => {return value.items.serviceId == item._id}))
  //   return state?.cartDetails?.cart?.filter((value) => {return value?.items?.serviceId == item?._id})
  //   // return state.cartDetails
  // })
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    if (error) {
      console.log("error msg of category ==>>>", error);
      dispatch(clearErrors_cartOperation());
    }
    if (qty) {
      setQuantity(qty);
    }
    // dispatch(getCartDetails({categoryName: category}))
    // dispatch(getServiceCartDetails({serviceId: item._id}))
  }, [qty, dispatch]);

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      console.log("quantity ===???", quantity)
    }
    // onDecrease(newQuantity);
    const payload = {
      categoryName: category,
      subCategoryId: item.subCategoryId,
      serviceId: item._id,
      quantity: quantity - 1,
    };

    dispatch(updateCart(payload));
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // onIncrease(newQuantity);
    const payload = {
      categoryName: category,
      subCategoryId: item.subCategoryId,
      serviceId: item._id,
      quantity: quantity + 1,
    };

    dispatch(updateCart(payload));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // if (loading) {
  //   return "loading";
  // }

  return (
    <>
      <div className="item my-4">
        <div className="item-img">
          <img className="img-div" src={"/image/serviceImages/" + item.image} />
        </div>
        <div className="item-detail">
          <a href="#" className="item-name">
            {item.serviceName}
          </a>
          <div className="item-price">
            <span className="new-price">
              <span>&#8377; </span>
              {item.price}
            </span>
            {/* <span className="old-price">$275.60</span> */}
          </div>
          <div className="item-price">
            <span className="new-price">{item.duration} Minutes</span>
            {/* <span className="old-price">$275.60</span> */}
          </div>
          <p>{item.description}</p>
          <div>
            {quantity < 1 ? (
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
          {/* <button type="button" className="add-btn">
                    add to cart
                  </button> */}
          <button
            type="link"
            className="view_details_btn"
            onClick={() => {
              setOpen(true);
              setDialogData(item);
            }}
          >
            View Details
          </button>
        </div>
      </div>
      <Details
        open={open}
        handleClose={handleClose}
        data={dialogData}
        qty={quantity}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    </>
  );
};

export default OneService;
