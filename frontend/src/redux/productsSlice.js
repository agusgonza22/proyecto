import { createSlice } from '@reduxjs/toolkit';

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
      const products = [
        { id: 1, title: 'Barcelona', subtitle: 2018, image: "barcelona", price: 80.000, liga: "la_liga"},
        { id: 2, title: 'Bayern Munich', subtitle: 2024, image: "bayern", price: 75.000, liga: 'bundesliga'},
        { id: 3, title: "Boca", subtitle: 2022, image: "boca", price: 120.000, liga: 'primera_division', },
        { id: 4, title: "Chelsea", subtitle: 2021, image: "chelsea", price: 90.000, liga: 'premier_league', },
        { id: 5, title: "Borussia Dortmund", subtitle: 2017, image: "dortmund",price: 140.000, liga:'bundesliga'},
        { id: 6, title: "Inter", subtitle: 2022, image: "inter", price: 125.000, liga: 'serie_a'},
        { id: 7, title: "Liverpool", subtitle: 2024, image: "liverpool", price: 100.000, liga: 'premier_league'},
        { id: 8, title: "Roma", subtitle: 2018, image: "roma", price: 120.000, liga: 'serie_a'},
        { id: 9, title: "Real Madrid", subtitle: 2023, image: "real", price: 70.000, liga: 'la_liga'},
        { id: 10, title: "River Plate", subtitle: 2024, image: "river", price: 70.000, liga: 'primera_division'}
      ]
      dispatch(getAllProducts(products));
      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
};