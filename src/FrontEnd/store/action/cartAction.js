import axios from "axios";
import {
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CLEAR_ERRORS
} from "../slice/cartSlice/cartDetailsSlice";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CLEAR_ERRORS as CLEAR_ERRORS_cartOperation
} from "../slice/cartSlice/cartOperationSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function getCartDetails(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CART_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/cart/getCategoryWiseCart`, payload, config);

      dispatch(CART_DETAILS_SUCCESS(data.data));
    } catch (error) {
      dispatch(CART_DETAILS_FAIL(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
}

export function getServiceCartDetails(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CART_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/cart/getServiceWiseCart`, payload, config);
      console.log(data.data)

      dispatch(CART_DETAILS_SUCCESS(data.data));
    } catch (error) {
      dispatch(CART_DETAILS_FAIL(error.response.data.message));
    }
  };
}

export function updateCart(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ADD_TO_CART_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/cart/add`, payload, config);

      dispatch(ADD_TO_CART_SUCCESS(data.data));
    } catch (error) {
      dispatch(ADD_TO_CART_FAIL(error.response.data.message));
    }
  };
}

export function clearErrors_cartDetails(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};

export function clearErrors_cartOperation(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS_cartOperation());
  }
};