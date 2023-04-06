import { createSlice } from '@reduxjs/toolkit';
import status from '../../status';


const allSubCategorySlice = createSlice({
    name: 'allSubCategory',
    initialState: {
      loading: false,
      subcategory: []
    },
    reducers: {
      ALL_SUBCATEGORY_REQUEST(state, action){ //1
        return {
          loading: true,
          subcategory: []
        };
      },
      ALL_SUBCATEGORY_SUCCESS(state, action){ //2
        // console.log(action.payload)
        return {
          loading: false,
          subcategory: action.payload,
        }; 
      },
      ALL_SUBCATEGORY_FAIL(state, action){ //3
        return {
          loading: false,
          subcategory: [],
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

export default allSubCategorySlice.reducer;

export const { 
  ALL_SUBCATEGORY_REQUEST,
  ALL_SUBCATEGORY_SUCCESS,
  ALL_SUBCATEGORY_FAIL,
  CLEAR_ERRORS } = allSubCategorySlice.actions;