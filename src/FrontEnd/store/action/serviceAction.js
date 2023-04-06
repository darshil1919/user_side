import axios from "axios";
import {
ALL_SERVICE_REQUEST,
ALL_SERVICE_SUCCESS,
ALL_SERVICE_FAIL,
CLEAR_ERRORS
} from "../slice/serviceSlice/allServiceSlice";

export function getServiceBySubCategory(subCategoryName) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      const payload = {subCategoryName: subCategoryName}

      const { data } = await axios.post(`/api/v1/service/getServiceBySubCategory`, payload, config);
      console.log(data.data)

      dispatch(ALL_SERVICE_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_SERVICE_FAIL, error.response.data.message);
    }
  };
}

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};