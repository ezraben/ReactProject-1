import { createSlice } from "@reduxjs/toolkit";

const initalAuthState = {
  loggedIn: false,

  userData: {},

  bizState: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState: initalAuthState,

  reducers: {
    login(state) {
      state.loggedIn = true;
    },

    logout(state) {
      state.loggedIn = false;
      state.userData = {};
      state.bizState = false;
    },

    upDateUserData(state, action) {
      state.userData = action.payload;
      state.bizState = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
