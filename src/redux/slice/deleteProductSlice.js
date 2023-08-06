import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk("products", async (id) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return response.data;
});

const deleteProductSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    deleteProduct: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.deleteProduct = action.payload;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default deleteProductSlice.reducer;
