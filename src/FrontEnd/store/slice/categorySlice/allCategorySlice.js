import { createSlice } from '@reduxjs/toolkit';
import status from '../../status';


const allCategorySlice = createSlice({
    name: 'allCategory',
    initialState: {
      loading: false,
      category: []
    },
    reducers: {
      ALL_CATEGORY_REQUEST(state, action){ //1
        return {
          loading: true,
          category: []
        };
      },
      ALL_CATEGORY_SUCCESS(state, action){ //2
        // console.log(action.payload)
        return {
          loading: false,
          category: action.payload,
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

export default allCategorySlice.reducer;

export const { 
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_ERRORS } = allCategorySlice.actions;