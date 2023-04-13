import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "../slice/userSlice/userSlice";

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

export function register(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REGISTER_USER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/add`,
        payload,
        config
      );

      dispatch(REGISTER_USER_SUCCESS(data.user));
    } catch (error) {
      dispatch(REGISTER_USER_FAIL(error.response.data.message));
    }
  };
}

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const { data } = await axios.get(`/api/v1/customer/me`);
    console.log(data)

    dispatch(LOAD_USER_SUCCESS(data.user));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data.message));
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/customer/logout`);

    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL(error.response.data.message));
  }
};

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};
