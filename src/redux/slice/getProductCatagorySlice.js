import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductCategories = createAsyncThunk("categories", async () => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return response.data;
});

const getProductCategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    productCategories: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [getProductCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productCategories = action.payload;
    },
    [getProductCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default getProductCategoriesSlice.reducer;
