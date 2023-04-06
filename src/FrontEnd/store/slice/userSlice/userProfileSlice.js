import { createSlice } from '@reduxjs/toolkit';


const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
      loading: false,
      data: {},
    },
    reducers: {
      UPDATE_PROFILE_REQUEST(state, action){
        return {
          ...state,
          loading: true,
        };  
      },
      UPDATE_PASSWORD_REQUEST(state, action){
        return {
          ...state,
          loading: true,
        };  
      },
      UPDATE_USER_REQUEST(state, action){
        return {
          ...state,
          loading: true,
        };  
      },
      DELETE_USER_REQUEST(state, action){
        return {
          ...state,
          loading: true,
        };  
      },
      UPDATE_PROFILE_SUCCESS(state, action){
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      },
      UPDATE_PASSWORD_SUCCESS(state, action){
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      },
      UPDATE_USER_SUCCESS(state, action){
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      },
      DELETE_USER_SUCCESS(state, action){
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
      },
      UPDATE_PROFILE_FAIL(state, action){
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      UPDATE_PASSWORD_FAIL(state, action){
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      UPDATE_USER_FAIL(state, action){
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      DELETE_USER_FAIL(state, action){
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      UPDATE_PROFILE_RESET(state, action){
        return {
          ...state,
          isUpdated: false,
        };
      },
      UPDATE_PASSWORD_RESET(state, action){
        return {
          ...state,
          isUpdated: false,
        };
      },
      UPDATE_USER_RESET(state, action){
        return {
          ...state,
          isUpdated: false,
        };
      },
      DELETE_USER_RESET(state, action){
      return {
        ...state,
        isDeleted: false,
      };
    },
      CLEAR_ERRORS(state, action){
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default userProfileSlice.reducer;

export const { 
UPDATE_PROFILE_REQUEST,
UPDATE_PASSWORD_REQUEST,
UPDATE_USER_REQUEST,
DELETE_USER_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PASSWORD_SUCCESS,
UPDATE_USER_SUCCESS,
DELETE_USER_SUCCESS,
UPDATE_PROFILE_FAIL,
UPDATE_PASSWORD_FAIL,
UPDATE_USER_FAIL,
DELETE_USER_FAIL,
UPDATE_PROFILE_RESET,
UPDATE_PASSWORD_RESET,
UPDATE_USER_RESET,
DELETE_USER_RESET,
CLEAR_ERRORS } = userProfileSlice.actions;