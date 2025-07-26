import { configureStore } from "@reduxjs/toolkit";

import { booksReducer } from "./reducers";

const store = configureStore({
  reducer: {
    booksReducer,
  },
});

export default store;
