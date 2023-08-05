import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import getAllProductSlice from "../slice/getAllProductSlice";

export default configureStore({
  reducer: {
    getAllProductS: getAllProductSlice
  },
  middleware: [thunk],
});
