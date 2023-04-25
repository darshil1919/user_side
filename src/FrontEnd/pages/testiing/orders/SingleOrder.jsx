import React, { useState } from "react";
import "./singleorder.css";
import moment from "moment";
import Orderdetails from "./Orderdetails";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getOrderList } from "../../../store/action/orderAction";

const SingleOrder = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [cancelOrderLoading, setCancelOrderLoading] = useState(false);
  const dispatch = useDispatch();

  let onClickViewDetails = () => {
    setOpen(true);
    setDialogData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let onCancelOrder = (id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`/api/v1/order/deleteorder?id=${id}`, config)
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        setCancelOrderLoading(false)
        toast.success(res.data.data);
      })
      .catch((error) => {
        setCancelOrderLoading(false)
        toast.error(error.response.data.message);
        console.log("error=>", error);
      });
      dispatch(getOrderList())
  }

  return (
    <>
      <div className="card bg-primary-subtle mt-4">
        {/* <img
          src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
          className="card-img-top"
          alt="..."
        /> */}
        <div className="card-body">
          <div className="text-section">
            <span>Order Id : {data._id}</span>
            <h5 className="card-title fw-bold">
              <span>
              {data?.items?.map((value, index) => {
                return <span key={index}>{value?.serviceName}, </span>;
              })}
              </span>
            </h5>
            <p className="card-text text-danger">
              {(data.status == "pending" || data.status == "cancelled") ? 
              <span className="text-uppercase text-danger">BOOKING {data.status}</span>
               : null
              }
              {(data.status == "confirmed" || data.status == "completed") ? 
              <span className="text-uppercase text-success">BOOKING {data.status}</span>
               : null
              }
              {(data.status == "working") ? 
              <span className="text-uppercase text-info">BOOKING {data.status}</span>
               : null
              }
            </p>
            <p className="card-text">
              <span>{moment(data?.startTime).format("LLLL")}</span>
            </p>
            {/* <p className="card-text">
              Some quick example text to build on the card's content.
            </p> */}
          </div>
          <div className="cta-section">
            <div className="h1">
              <span>&#8377; </span>
              {data.grandTotal}
            </div>
            <button
              className="btn btn-dark h1"
              onClick={() => {
                // onClickViewDetails()
                setOpen(true);
                setDialogData(data);
              }}
            >
              View Details
            </button>
            {
              data.status == "pending" ? 
            <button
              className="btn btn-dark h1"
              onClick={() => {
                onCancelOrder(data._id)
              }}
            >
              Cancel
            </button> : null
            }
          </div>
        </div>
      </div>
      <Orderdetails open={open} handleClose={handleClose} data={dialogData} />
      {
        cancelOrderLoading ? <Loader /> : null
      }
    </>
  );
};

export default SingleOrder;
