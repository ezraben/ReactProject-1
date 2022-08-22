import { createSlice } from "@reduxjs/toolkit";

//create variabels that we want redux to store for us
const initalIsBizState = {
  register: false,
};

//this is a redux toolKit pattern to create the store for redux it self

const isBizSlice = createSlice({
  //for redux
  name: "isBiz",
  //initial state
  initialState: initalIsBizState,
  //functions to munipulate the state, the function inside the reducers are called actions
  reducers: {
    //we will call thi function when use logged in to update the loggedIn state

    //we will call thi function when use logged in to update the loggedIn state
    register(state) {
      state.checked = true;
    },
    UpDateCheckedBox(state, action) {
      state.register = action.payload;
    },
  },
});

//export the actions so we can use them from other components/pages to update the state
export const isBizActions = isBizSlice.actions;

//export the configuration/state/actions to the index.js of redux, so redux can configure the state
export default isBizSlice.reducer;
