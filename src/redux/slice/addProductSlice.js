import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk("products", async (form) => {
  const response = await axios.post(`https://fakestoreapi.com/products`, 
    form,
  );
  return response.data;
});

const addProductSLice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    addProduct: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [addProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addProduct = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default addProductSLice.reducer;
