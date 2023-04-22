import { createSlice } from '@reduxjs/toolkit';


const top6ServiceSlice = createSlice({
    name: 'top6Service',
    initialState: {
      loading: false,
      service: [],
    },
    reducers: {
      TOP_6_SERVICE_REQUEST(state, action){ //1
        return {
          loading: true,
          service: [],
        };  
      },
      TOP_6_SERVICE_SUCCESS(state, action){ //2
        return {
          loading: false,
          service: action.payload,
        };  
      },
      TOP_6_SERVICE_FAIL(state, action){ //3
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

export default top6ServiceSlice.reducer;

export const { 
TOP_6_SERVICE_REQUEST,
TOP_6_SERVICE_SUCCESS,
TOP_6_SERVICE_FAIL,
CLEAR_ERRORS } = top6ServiceSlice.actions;