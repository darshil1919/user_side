import { createSlice } from '@reduxjs/toolkit';


const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
      loading: false,
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
      CLEAR_ERRORS(state, action){
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default userProfileSlice.reducer;

const actions = userProfileSlice.actions;
export const { 
UPDATE_PROFILE_REQUEST,
UPDATE_PASSWORD_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PROFILE_FAIL,
UPDATE_PASSWORD_FAIL,
UPDATE_PROFILE_RESET,
UPDATE_PASSWORD_RESET,
CLEAR_ERRORS } = actions;