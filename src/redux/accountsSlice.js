import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: 
    {name: "User1", lastName: "User1", username: "User1", password: "User1", isAdmin: false, cart: {}, discount: 0 }
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.accounts.find(account => account.username === username && account.password === password);
      if (user) {
        state.currentUser = user;
        state.loginStatus = 'success';
      } else {
        state.loginStatus = 'failed';
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
    register: (state, action) => {
      state.accounts.push(action.payload);
      state.registrationStatus = 'success';
    },
    addItemToCart: (state, action) => {
      const itemId = action.payload;
      if (state.currentUser.cart[itemId]) {
        state.currentUser.cart[itemId] += 1;
      } else {
        state.currentUser.cart[itemId] = 1;
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      delete state.currentUser.cart[itemId];
    },
    lessCartItemQuantity: (state, action) => {
      const itemId = action.payload;
      if (state.currentUser.cart[itemId] && state.currentUser.cart[itemId] > 1) {
        state.currentUser.cart[itemId] -= 1;
      }
    },
    updateDiscount: (state, action) => {
      state.currentUser.discount = action.payload;
    },
    emptyCart: (state) => {
      state.currentUser.cart = {};
    },
    resetLoginStatus: (state) => {
      state.loginStatus = null;
    },
  },
});

export const { addAccount, login, logout, register, addItemToCart, removeItemFromCart, lessCartItemQuantity, updateDiscount, emptyCart, resetLoginStatus } = accountsSlice.actions;

export default accountsSlice.reducer;
