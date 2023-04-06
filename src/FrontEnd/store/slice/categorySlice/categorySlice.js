import { createSlice } from '@reduxjs/toolkit';


const categorySlice = createSlice({
    name: 'category',
    initialState: {
      loading: false,
      data: {},
    },
    reducers: {
      UPDATE_CATEGORY_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
        };  
      },
      UPDATE_CATEGORY_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          idUpdated: action.payload,
        }; 
      },
      UPDATE_CATEGORY_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      UPDATE_CATEGORY_RESET(state, action){ //3
        return {
          ...state,
          isUpdated: false,
        };
      },
      DELETE_CATEGORY_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
        };  
      },
      DELETE_CATEGORY_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        }; 
      },
      DELETE_CATEGORY_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      DELETE_CATEGORY_RESET(state, action){ //3
        return {
          ...state,
          isDeleted: false,
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

export default categorySlice.reducer;

export const { 
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CLEAR_ERRORS } = categorySlice.actions;