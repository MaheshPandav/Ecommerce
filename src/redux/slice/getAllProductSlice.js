import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProduct = createAsyncThunk("products", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const getAllProductSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    allProduct: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allProduct = action.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default getAllProductSlice.reducer;
