import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import getAllProductSlice from "../slice/getAllProductSlice";
import deleteProductSlice from "../slice/deleteProductSlice";
import getProductCatagorySlice from "../slice/getProductCatagorySlice";
import getProductByCategoriesSlice from "../slice/getProductByCategoriesSlice";
import addProductSlice from "../slice/addProductSlice";
import editProductSlice from "../slice/editProductSlice";

export default configureStore({
  reducer: {
    allProductS: getAllProductSlice,
    deleteProduct: deleteProductSlice,
    produCtcategories: getProductCatagorySlice,
    productByCategories: getProductByCategoriesSlice,
    addProduct: addProductSlice,
    editProduct: editProductSlice,
  },
  middleware: [thunk],
});
