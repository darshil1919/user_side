import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADD_REVIEW_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS } from "../slice/reviewSlice/reviewOperationSlice";
import { REVIEW_DETAILS_FAIL, REVIEW_DETAILS_REQUEST, REVIEW_DETAILS_SUCCESS } from "../slice/reviewSlice/reviewDetailsSlice";

export function addReview(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ADD_REVIEW_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/review/add`, payload, config);

      dispatch(ADD_REVIEW_SUCCESS(data.data));
      toast.success(data.data);
    } catch (error) {
      dispatch(ADD_REVIEW_FAIL(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
}

export function getReviewDetails(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REVIEW_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/review/getreview`, payload, config);

      dispatch(REVIEW_DETAILS_SUCCESS(data.data));
      toast.success(data.data);
    } catch (error) {
      dispatch(REVIEW_DETAILS_FAIL(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
}

export function getReviewByService(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REVIEW_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/review/getReviewByService`, payload, config);

      dispatch(REVIEW_DETAILS_SUCCESS(data.data));
    } catch (error) {
      dispatch(REVIEW_DETAILS_FAIL(error.response.data.message));
      // toast.error(error.response.data.message);
    }
  };
}

export function getTop3Review(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REVIEW_DETAILS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/review/gettop3review`, config);

      dispatch(REVIEW_DETAILS_SUCCESS(data.data));
    } catch (error) {
      dispatch(REVIEW_DETAILS_FAIL(error.response.data.message));
      // toast.error(error.response.data.message);
    }
  };
}