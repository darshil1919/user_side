import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors_orderDetails,
  getOrderList,
} from "../../../store/action/orderAction";
import SingleOrder from "./SingleOrder";
import { Backdrop, CircularProgress } from "@mui/material";

const Orders = () => {
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors_orderDetails());
    }

    dispatch(getOrderList());
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="container">
            <h4>My Orders</h4>

            {order?.map((value, index) => {
              return <SingleOrder data={value} key={index} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
