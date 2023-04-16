import { createSlice } from '@reduxjs/toolkit';


const reviewDetailsSlice = createSlice({
    name: 'reviewDetails',
    initialState: {
      loading: true,
      review: {}
    },
    reducers: {
      REVIEW_DETAILS_REQUEST(state, action){ //1
        return {
          loading: true,
          review: {}
        }
      },
      REVIEW_DETAILS_SUCCESS(state, action){ //2
        return {
          loading: false,
          review: action.payload
        };
      },
      REVIEW_DETAILS_FAIL(state, action){ //3
        return {
          loading: false,
          review: {},
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

export default reviewDetailsSlice.reducer;

export const { 
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  CLEAR_ERRORS } = reviewDetailsSlice.actions;