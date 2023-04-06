import axios from "axios";
import {
  ALL_SUBCATEGORY_REQUEST,
  ALL_SUBCATEGORY_SUCCESS,
  ALL_SUBCATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../slice/subCategorySlice/allSubCategorySlice";

export function getSubCategoryByCategory(categoryName) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      const payload = {categoryName: categoryName}

      const { data } = await axios.post(`/api/v1/subcategory/getSubCategoryByCategory`, payload, config);
      console.log(data.data)

      dispatch(ALL_SUBCATEGORY_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_SUBCATEGORY_FAIL(error.response.data.message));
    }
  };
}

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};