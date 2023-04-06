import { createSlice } from '@reduxjs/toolkit';


const userDetailSlice = createSlice({
    name: 'useDetail',
    initialState: {
      loading: false,
      data: {},
    },
    reducers: {
      USER_DETAILS_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
        };  
      },
      USER_DETAILS_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          user: action.payload,
        }; 
      },
      USER_DETAILS_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      CLEAR_ERRORS(state, action){ //4
        return {
          ...state,
          error: null,
        };
      }
  }
});

export default userDetailSlice.reducer;

export const { 
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL } = userDetailSlice.actions;