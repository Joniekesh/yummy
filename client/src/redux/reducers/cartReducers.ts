import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICartProduct } from "../../interfaces";

interface CartState {
  products: ICartProduct[];
  totalPrice: number;
  quantity: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      const item = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (item) {
        item.qty += action.payload.qty;
        state.totalPrice +=
          (action.payload.price ?? 0) * (action.payload.qty ?? 1);
      } else {
        state.products.push({ ...action.payload });
        state.quantity += 1;
        state.totalPrice += action.payload.price * action.payload.qty;
      }
    },

    removeFromToCart: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );

      if (index !== -1) {
        const removedItem = state.products[index];
        state.totalPrice -= removedItem.price * removedItem.qty;
        state.products.splice(index, 1);
        state.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeFromToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
