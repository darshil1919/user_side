import { createSlice } from '@reduxjs/toolkit';


const allServiceSlice = createSlice({
    name: 'serviceList',
    initialState: {
      loading: false,
      service: [],
    },
    reducers: {
      SERVICE_LIST_REQUEST(state, action){ //1
        return {
          loading: true,
          service: [],
        };  
      },
      SERVICE_LIST_SUCCESS(state, action){ //2
        return {
          loading: false,
          service: action.payload,
        };  
      },
      SERVICE_LIST_FAIL(state, action){ //3
        return {
          loading: false,
          error: action.payload,
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

export default allServiceSlice.reducer;

export const { 
SERVICE_LIST_REQUEST,
SERVICE_LIST_SUCCESS,
SERVICE_LIST_FAIL,
CLEAR_ERRORS } = allServiceSlice.actions;