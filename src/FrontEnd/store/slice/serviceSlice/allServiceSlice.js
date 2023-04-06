import { createSlice } from '@reduxjs/toolkit';


const allServiceSlice = createSlice({
    name: 'allService',
    initialState: {
      loading: false,
      service: [],
    },
    reducers: {
      ALL_SERVICE_REQUEST(state, action){ //1
        return {
          loading: true,
          service: [],
        };  
      },
      ALL_SERVICE_SUCCESS(state, action){ //2
        return {
          loading: false,
          service: action.payload,
        };  
      },
      ALL_SERVICE_FAIL(state, action){ //3
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
ALL_SERVICE_REQUEST,
ALL_SERVICE_SUCCESS,
ALL_SERVICE_FAIL,
CLEAR_ERRORS } = allServiceSlice.actions;