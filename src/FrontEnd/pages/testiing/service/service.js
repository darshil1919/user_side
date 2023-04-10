import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import serviceStyle from "./service.module.css";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  getServiceBySubCategory,
  clearErrors,
} from "../../../store/action/serviceAction";
import Details from "./Details";
import OneService from "./OneService";
import { getCartDetails } from "../../../store/action/cartAction";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Service = (props) => {
  Aos.init({ duration: 700 });

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  // const [open, setOpen] = React.useState(false);
  // const [dialogData, setDialogData] = React.useState({});
  // const [quantity, setQuantity] = useState(0);
  // const [loadingOpen, setLoadingOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, service } = useSelector((state) => {
    return state.allService;
  });

  const cart = useSelector((state) => {
    return state.cartDetails.cart
  })

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    // if(loading){

    // }

    dispatch(getServiceBySubCategory(props.subCategoryName));
    dispatch(getCartDetails({categoryName: category}))
  }, []);

  // if (loading == true) {
  //   return <h2>loading.....</h2>;
  // }

  return (
    <div className={serviceStyle.services_container}>
      <div className={serviceStyle.services_container_title}>
        <h4>{props.subCategoryName}</h4>
        <h5>{"Explore the greatest our services."}</h5>
      </div>
      <div className={serviceStyle.services_container_content}>
        <div className="item-list details-active">
          {service?.map((item, index) => {
            let quantity = 0
            cart.map((value) => {
              if(value.items.serviceId == item._id){
                quantity = value.items.quantity
              }
            })
            return (
              <OneService key={index} item={item} qty={quantity} />

              // <div key={index} className="item my-4">
              //   <div className="item-img">
              //     <img className="img-div" src={"/image/serviceImages/" + item.image} />
              //   </div>
              //   <div className="item-detail">
              //     <a href="#" className="item-name">
              //       {item.serviceName}
              //     </a>
              //     <div className="item-price">
              //       <span className="new-price">
              //         <span>&#8377; </span>
              //         {item.price}
              //       </span>
              //       {/* <span className="old-price">$275.60</span> */}
              //     </div>
              //     <div className="item-price">
              //       <span className="new-price">{item.duration} Minutes</span>
              //       {/* <span className="old-price">$275.60</span> */}
              //     </div>
              //     <p>{item.description}</p>
              //     <div>
              //     {quantity < 1 ? (
              //       <button className="btn fs-4 fw-bold cart-item_add-btn" onClick={handleIncrease}>
              //         <span className=''>Add</span>
              //       </button>
              //     ) : (
              //       <div className="d-flex justify-content-between align-items-center fs-4 fw-bold cart-item_quantity">
              //         <button className="btn cart-item_quantity-btn" onClick={handleDecrease}>
              //           <FaMinus fill={'gray'} />
              //         </button>
              //         <span className="cart-item_quantity-value">{quantity}</span>
              //         <button className="btn cart-item_quantity-btn" onClick={handleIncrease}>
              //           <FaPlus fill={'gray'} />
              //         </button>
              //       </div>
              //     )}
              //   </div>
              //     {/* <button type="button" className="add-btn">
              //       add to cart
              //     </button> */}
              //     <button
              //       type="link"
              //       className="view_details_btn"
              //       onClick={() => {
              //         setOpen(true);
              //         setDialogData(item)
              //       }}
              //     >
              //       View Details
              //     </button>
              //   </div>
              // </div>

              // <div
              //   className={serviceStyle.services_container_content_item}
              //   key={item._id}
              //   data-aos="zoom-in-up"
              // >
              //   {/* <Link to={"/categories/" + item.category + "/" + item.id}> */}
              //     <img
              //       className={serviceStyle.services_container_content_item_img}
              //       src={"image/serviceImages/" + item.image}
              //       alt={item.serivceName}
              //     />
              //     <div
              //       className={
              //         serviceStyle.services_container_content_item_label
              //       }
              //     >
              //       <GoPrimitiveDot fill="#6b7cff" size={20} />
              //       <p>{item.description}</p>
              //     </div>
              //   {/* </Link> */}
              // </div>
            );
          })}
        </div>
      </div>
      {/* <Details open={open} handleClose={handleClose} data={dialogData} /> */}
      {(loading)? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : null }
    </div>
  );
};
