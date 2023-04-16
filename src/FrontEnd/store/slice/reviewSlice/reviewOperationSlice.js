import { createSlice } from '@reduxjs/toolkit';


const reviewOperationSlice = createSlice({
    name: 'reviewOperation',
    initialState: {
      loading: false,
    },
    reducers: {
      ADD_REVIEW_REQUEST(state, action){ //1
        return{
          ...state,
          loading: true,
        }
      },
      ADD_REVIEW_SUCCESS(state, action){ //2
        return {
          ...state,
          loading: false,
          addedMsg: action.payload
        };
      },
      ADD_REVIEW_FAIL(state, action){ //3
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      },
      ADD_REVIEW_RESET(state, action){ //4
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

export default reviewOperationSlice.reducer;

export const { 
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  ADD_REVIEW_RESET,
  CLEAR_ERRORS } = reviewOperationSlice.actions;