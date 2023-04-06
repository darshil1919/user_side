import { createSlice } from '@reduxjs/toolkit';


const allUserSlice = createSlice({
    name: 'allUser',
    initialState: {
      loading: false,
      data: {},
    },
    reducers: {
      ALL_USERS_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
        };  
      },
      ALL_USERS_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          users: action.payload,
        }; 
      },
      ALL_USERS_FAIL(state, action){ //3
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
      },
  }
});

export default allUserSlice.reducer;

export const { 
  ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS } = allUserSlice.actions;