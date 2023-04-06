import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        LOGIN_REQUEST(state, action){
            return{
                loading: true,
                isAuthenticated: false,
            }
        },
        LOGIN_SUCCESS(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
              };
        },
        LOGIN_FAIL(state, action){
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
            };
        },
        REGISTER_USER_REQUEST(state, action){
            return{
                loading: true,
                isAuthenticated: false,
            }
        },
        LOAD_USER_REQUEST(state, action){
            return{
                loading: true,
                isAuthenticated: false,
            }
        },
        REGISTER_USER_SUCCESS(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
              };
        },
        LOAD_USER_SUCCESS(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
              };
        },
        LOGOUT_SUCCESS(state, action){
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
            };
        },
        REGISTER_USER_FAIL(state, action){
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
            };
        },
        LOAD_USER_FAIL(state, action){
            return {
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
            };
        },
        LOGOUT_FAIL(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        CLEAR_ERRORS(state, action){
            return {
                ...state,
                error: null,
            };
        }   
    },
});

export default userSlice.reducer;

export const { 
LOGIN_REQUEST,
REGISTER_USER_REQUEST,
LOAD_USER_REQUEST,
LOGIN_SUCCESS,
REGISTER_USER_SUCCESS,
LOAD_USER_SUCCESS,
LOGOUT_SUCCESS,
LOGIN_FAIL,
REGISTER_USER_FAIL,
LOAD_USER_FAIL,
LOGOUT_FAIL,
CLEAR_ERRORS } = userSlice.actions;
