import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import conterReducer from "./counter";

//inithialize the global redux state
const store = configureStore({
  reducer: {
    auth: authReducer,
    countdr: conterReducer,
  },
});

export default store;
