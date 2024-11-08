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
      // const response = await axios.get('http://localhost:8000/api/vinilos');
      // const products = response.data
      const products = [{ id: 1, title: 'In Rainbows', subtitle: 'Radiohead', image: "inRainbows", price: 80.000, genero: "Alternativo"},
      { id: 2, title: 'Civilización', subtitle: 'Los Piojos', image: "civilizacion", price: 75.000, genero: 'Nacional'},
      { id: 3, title: "Un Verano Sin Ti", subtitle: 'Bad Bunny', image: "uvst", price: 120.000, genero: 'Pop', },
      { id: 4, title: "AM", subtitle: 'Arctic Monkeys', image: "am", price: 90.000, genero: 'Rock', },
      { id: 5, title: "YHLQMDLG", subtitle:'Bad Bunny', image: "badbo",price: 140.000, genero:'Pop'},
      { id: 6, title: "Talento De Barrio", subtitle:'Daddy Yankee', image: "TDB", price: 125.000, genero: 'Pop'},
      { id: 7, title: "Easy Money Baby", subtitle:'Myke Towers', image: "EasyMoney", price: 100.000, genero: 'Pop'},
      { id: 8, title: "Real Hasta La Muerte", subtitle:'Anuel AA', image: "RHLM", price: 120.000, genero: 'Pop'},
      { id: 9, title: "Crisis", subtitle:'Las Pastillas Del Abuelo', image: "crisis", price: 70.000, genero: 'Rock'}]
      dispatch(getAllProducts(products));
      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
};