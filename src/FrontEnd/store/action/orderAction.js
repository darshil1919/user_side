import axios from "axios";
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, CLEAR_ERRORS as CLEAR_ERRORS_orderDetails } from "../slice/orderSlice/orderDetailsSlice";

export function getOrderList() {
  return async (dispatch, getState) => {
    try {
      dispatch(ORDER_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/order/getorderlist`, config);

      dispatch(ORDER_DETAILS_SUCCESS(data.data));
    } catch (error) {
      dispatch(ORDER_DETAILS_FAIL(error.response.data.message));
      // toast.error(error.response.data.message);
    }
  };
}

export function clearErrors_orderDetails(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS_orderDetails());
  }
};