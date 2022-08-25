import { createSlice } from "@reduxjs/toolkit";

//create variabels that we want redux to store for us
const initalCountertate = {
  conter: 0,
};

//this is a redux toolKit pattern to create the store for redux it self

const counterSlice = createSlice({
  //for redux
  name: "conter",
  //initial state
  initialState: initalCountertate,
  //functions to munipulate the state, the function inside the reducers are called actions
  reducers: {
    //we will call thi function when use logged in to update the loggedIn state
    number(state) {
      state.number = true;
    },
  },
});

//export the actions so we can use them from other components/pages to update the state
export const authActions = counterSlice.actions;

//export the configuration/state/actions to the index.js of redux, so redux can configure the state
export default counterSlice.reducer;
