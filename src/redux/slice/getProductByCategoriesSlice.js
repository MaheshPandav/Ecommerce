import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductByCategories = createAsyncThunk(
  "products",
  async (categories) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${categories}`
    );
    return response.data;
  }
);

const getProductByCategoriesSLice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    ProductByCategories: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [getProductByCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductByCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ProductByCategories = action.payload;
    },
    [getProductByCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default getProductByCategoriesSLice.reducer;
