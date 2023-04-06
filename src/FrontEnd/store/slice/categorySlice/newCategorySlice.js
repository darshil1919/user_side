import { createSlice } from '@reduxjs/toolkit';


const newCategorySlice = createSlice({
    name: 'newCategory',
    initialState: {
      loading: false,
      data: {},
    },
    reducers: {
      NEW_CATEGORY_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
        };  
      },
      NEW_CATEGORY_SUCCESS(state, action){ //2
        return {
          loading: false,
          success: action.payload.success,
          category: action.payload.category,
        }; 
      },
      NEW_CATEGORY_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      NEW_PRODUCT_RESET(state, action){
        return{
          ...state,
          success: false
        }
      },
      CLEAR_ERRORS(state, action){ //4
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default newCategorySlice.reducer;

export const { 
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_PRODUCT_RESET,
  CLEAR_ERRORS } = newCategorySlice.actions;