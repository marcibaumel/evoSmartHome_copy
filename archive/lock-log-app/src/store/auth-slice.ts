import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: '' },
  reducers: {
    getAuthData(state){

    },
    replaceAuthData(state, actions) {
      state.token = actions.payload;
    },
    resetAuthData(state) {
      state.token = Cookies.remove('jwt_data');
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
