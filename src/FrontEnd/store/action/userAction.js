import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_REQUEST } from "../slice/userSlice/userSlice";
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../slice/userSlice/userProfileSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../slice/userSlice/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";

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

      console.log("login user data --->", data)

      dispatch(LOGIN_SUCCESS(data.data));
    } catch (error) {
      dispatch(LOGIN_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
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
      toast.error(error.response.data.message)
    }
  };
}

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const { data } = await axios.get(`/api/v1/customer/me`);

    dispatch(LOAD_USER_SUCCESS(data.data));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data.message));
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch(LOGOUT_REQUEST());
    await axios.get(`/api/v1/customer/logout`);

    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL(error.response.data.message));
    toast.error(error.response.data.message)
  }
};

export function updateProfile(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_PROFILE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/updatecustomer`,
        payload,
        config
      );

      dispatch(UPDATE_PROFILE_SUCCESS(data.data.message));
      toast.success(data.data.message)
      dispatch(loadUser());
      // dispatch(loadUser())
    } catch (error) {
      dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

export function updatePassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/updatepassword`,
        payload,
        config
      );

      dispatch(UPDATE_PASSWORD_SUCCESS(data.data));
      toast.success(data.data)
    } catch (error) {
      dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

export function forgotPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(FORGOT_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/forgotpassword`,
        payload,
        config
      );

      console.log("reset --->>>", data);

      dispatch(FORGOT_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
    } catch (error) {
      dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

export function resetPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(RESET_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/resetpassword`,
        payload,
        config
      );

      dispatch(RESET_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
      // const navigate = useNavigate();
      // navigate("/SignIn")
    } catch (error) {
      dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

export function clearErrors(){
  return async (dispatch, getState) => {
    dispatch(CLEAR_ERRORS());
  }
};
