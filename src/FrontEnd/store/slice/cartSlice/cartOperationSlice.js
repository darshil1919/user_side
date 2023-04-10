import { createSlice } from '@reduxjs/toolkit';


const cartOperationSlice = createSlice({
    name: 'cartOperation',
    initialState: {
      loading: false,
    },
    reducers: {
      ADD_TO_CART_REQUEST(state, action){ //1
        return{
          ...state,
          loading: true,
        }
      },
      ADD_TO_CART_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          addedMsg: action.payload
        };
      },
      ADD_TO_CART_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      },
      ADD_TO_CART_RESET(state, action){ //4
        return{
          ...state,
          addedMsg: null
        }
      },
      CLEAR_ERRORS(state, action){ //5
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default cartOperationSlice.reducer;

export const { 
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_RESET,
  CLEAR_ERRORS } = cartOperationSlice.actions;