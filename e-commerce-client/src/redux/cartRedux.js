import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    //addProduct is action
    addProduct: (state, action) => {
      //state can only muatate like this with @reduxjs/toolkit
      //cart quantity
      state.quantity += 1;
      state.products.push(action.payload);
      //action.payload.quantity is quatity of particular product
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
