import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoginStatus: false,
  UserData: null,
  posts: null,
  postssaved:false,
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
    },
    saveposts: (state, action) => {
      state.postssaved = true,
      state.posts = action.payload;
    }
  }
});


export const { login, logout,saveposts } = authslice.actions;

export default authslice.reducer;