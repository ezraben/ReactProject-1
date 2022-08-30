import { createSlice } from "@reduxjs/toolkit";

//create variabels that we want redux to store for us
const initalAuthState = {
  loggedIn: false,
  // userData: "",
  userData: {},
  // bizState: false,
  bizState: false,
};

//this is a redux toolKit pattern to create the store for redux it self

const authSlice = createSlice({
  //for redux
  name: "auth",
  //initial state
  initialState: initalAuthState,
  //functions to munipulate the state, the function inside the reducers are called actions
  reducers: {
    //we will call thi function when use logged in to update the loggedIn state
    login(state) {
      state.loggedIn = true;
    },
    //we will call thi function when use logged in to update the loggedIn state
    logout(state) {
      state.loggedIn = false;
      state.userData = {};
      state.bizState = false;
    },

    upDateUserData(state, action) {
      state.userData = action.payload;
      state.bizState = action.payload;
    },
    // onLoginCheckBiz(state, action) {
    //   state.bizState = action.payload.biz;
    // },
  },
});

//export the actions so we can use them from other components/pages to update the state
export const authActions = authSlice.actions;

//export the configuration/state/actions to the index.js of redux, so redux can configure the state
export default authSlice.reducer;
