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

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) =>  state.user)
  const { loading, error, service } = useSelector((state) => {
    return state.allService;
  });

  const cart = useSelector((state) => {
    return state.cartDetails.cart.cartData
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

  return (
    <div className={serviceStyle.services_container}>
      <div className={serviceStyle.services_container_title}>
        <h4>{props.subCategoryName}</h4>
        <h5>{"Explore the greatest our services."}</h5>
        {(cart && isAuthenticated) ? 
        <Link className="btn btn-primary" to={"/cart?category=" + category}>Cart</Link> :
        null
        }
      </div>
      <div className={serviceStyle.services_container_content}>
        <div className="item-list details-active">
          {service?.map((item, index) => {
            let quantity = 0
            cart?.map((value) => {
              if(value.items.serviceId == item._id){
                quantity = value.items.quantity
              }
            })
            return (
              <OneService key={index} item={item} qty={quantity} />
            );
          })}
        </div>
      </div>
      {(loading)? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : null }
    </div>
  );
};
