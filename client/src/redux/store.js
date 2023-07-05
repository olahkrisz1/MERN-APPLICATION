import { configureStore } from "@reduxjs/toolkit";

import loadersReducer from "./loadersSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    loadersReducer,
    usersReducer,
  },
});

export default store;
