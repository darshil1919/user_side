import { createSlice } from '@reduxjs/toolkit';


const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
      loading: true,
      order: []
    },
    reducers: {
      ORDER_DETAILS_REQUEST(state, action){ //1
        return {
          loading: true,
          order: []
        }
      },
      ORDER_DETAILS_SUCCESS(state, action){ //2
        return {
          loading: false,
          order: action.payload
        };
      },
      ORDER_DETAILS_FAIL(state, action){ //3
        return {
          loading: false,
          order: [],
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

export default orderDetailsSlice.reducer;

export const { 
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS } = orderDetailsSlice.actions;