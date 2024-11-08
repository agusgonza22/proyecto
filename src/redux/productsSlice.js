import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    products: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getAllProducts } =
productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8000/api/vinilos');
      const products = response.data;
      dispatch(getAllProducts(products));
      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
};