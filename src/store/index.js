import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import conterReducer from "./counter";
import isBizReducer from "./isBizAccount";

//inithialize the global redux state
const store = configureStore({
  reducer: {
    auth: authReducer,
    countdr: conterReducer,
    isBizSlice: isBizReducer,
  },
});

export default store;
