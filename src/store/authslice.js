import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoginStatus: true,
  UserData: null,
}

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.LoginStatus = true;
      state.UserData = action.payload;
    },
    logout: (state) => {
      state.LoginStatus = false;
      state.UserData = null;
    }
  }
});


export const { login, logout } = authslice.actions;

export default authslice.reducer;