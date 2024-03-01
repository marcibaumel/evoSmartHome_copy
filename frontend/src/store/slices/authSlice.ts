import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Cookies from 'js-cookie';

interface AuthState {
    valid: string;
    token: string
}

const cookieData: string =  Cookies.get('jwt_token') || ''

const initialState: AuthState = {
    valid: cookieData,
    token: ''
};



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setValid: (state) => {
            state.valid = '';
        },
        setValidToken: (state) => {
            state.valid = cookieData
        },
        setToken: (state, actions) => {
            state.token = actions.payload;
        }
    },
});

export const { setValid, setValidToken, setToken } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.valid;
export default authSlice.reducer;
