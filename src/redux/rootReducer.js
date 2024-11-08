import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './accountsSlice';
import productsReducer from './productsSlice';

const rootReducer = combineReducers({
  accounts: cartReducer,
  products: productsReducer,
});

export default rootReducer;
