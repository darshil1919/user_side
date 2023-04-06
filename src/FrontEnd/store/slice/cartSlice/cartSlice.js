import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'allCategory',
    initialState: {
      loading: false,
      category: []
    },
    reducers: {
      ADD_TO_CART(state, action){ //1
        const item = action.payload;

        const isItemExist = state.cartItems.find(
          (i) => i._id === item._id
        );

        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i._id === isItemExist._id ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      },
      REMOVE_CART_ITEM(state, action){ //2
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
      },
      ALL_CATEGORY_FAIL(state, action){ //3
        return {
          loading: false,
          category: [],
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

export default cartSlice.reducer;

export const { 
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_ERRORS } = cartSlice.actions; 