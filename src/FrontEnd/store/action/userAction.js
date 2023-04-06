import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS } from "../slice/userSlice/userSlice";

export function login({email, password}) {
  return async (dispatch, getState) => {
    try {
      dispatch(LOGIN_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/login`,
        { email, password },
        config
      );

      dispatch(LOGIN_SUCCESS(data.user));
    } catch (error) {
      dispatch(LOGIN_FAIL(error.response.data.message));
    }
  };
}

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};
