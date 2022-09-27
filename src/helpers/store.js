import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../store/reducer";

export default configureStore({
  reducer: {
    moviesReducer,
  },
});
