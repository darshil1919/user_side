import { createSlice } from '@reduxjs/toolkit';


const cartDetailsSlice = createSlice({
    name: 'cartDetails',
    initialState: {
      loading: false,
      cart: []
    },
    reducers: {
      CART_DETAILS_REQUEST(state, action){ //1
        return {
          loading: true,
          cart: []
        }
      },
      CART_DETAILS_SUCCESS(state, action){ //2
        return {
          loading: false,
          cart: action.payload
        };
      },
      CART_DETAILS_FAIL(state, action){ //3
        return {
          loading: false,
          cart: [],
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

export default cartDetailsSlice.reducer;

export const { 
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CLEAR_ERRORS } = cartDetailsSlice.actions;