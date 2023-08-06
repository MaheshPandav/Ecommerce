import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPorduct = createAsyncThunk("products", async (data) => {
  const { id, form } = data;
  const response = await axios.put(
    `https://fakestoreapi.com/products/${id}`,
    form
  );
  return response.data;
});

const editPorductSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    editPorduct: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [editPorduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editPorduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.editPorduct = action.payload;
    },
    [editPorduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});

export default editPorductSlice.reducer;
