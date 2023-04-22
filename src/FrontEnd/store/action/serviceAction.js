import axios from "axios";
import {
ALL_SERVICE_REQUEST,
ALL_SERVICE_SUCCESS,
ALL_SERVICE_FAIL,
CLEAR_ERRORS
} from "../slice/serviceSlice/allServiceSlice";
import { TOP_6_SERVICE_FAIL, TOP_6_SERVICE_REQUEST, TOP_6_SERVICE_SUCCESS } from "../slice/serviceSlice/Top6ServiceSlice";

export function getServiceBySubCategory(subCategoryName) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      const payload = {subCategoryName: subCategoryName}

      const { data } = await axios.post(`/api/v1/service/getServiceBySubCategory`, payload, config);

      dispatch(ALL_SERVICE_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_SERVICE_FAIL, error.response.data.message);
    }
  };
}

export function getServiceForSearch() {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/service/getserviceforsearch`, config);

      dispatch(ALL_SERVICE_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_SERVICE_FAIL, error.response.data.message);
    }
  };
}

export function getTop6Service() {
  return async (dispatch, getState) => {
    try {
      dispatch(TOP_6_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/service/gettop6service`, config);
      console.log("top 6 --->>", data)

      dispatch(TOP_6_SERVICE_SUCCESS(data.data));
    } catch (error) {
      dispatch(TOP_6_SERVICE_FAIL, error.response.data.message);
    }
  };
}

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};