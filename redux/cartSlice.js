import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    price: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.price += action.payload.price;
      state.total += action.payload.totalPrice;
    },
    reset: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    quantityIncrease: (state, action) => {
      state.products.map((item) => {
        if (item.product_name === action.payload.product_name) {
          state.quantity += 1;
          item.foodQuantity += 1;
          state.price += action.payload.price;
          state.total += action.payload.price;
        }
      });
    },
    quantityDecrease: (state, action) => {
      state.products.map((item) => {
        if (item.product_name === action.payload.product_name) {
          if (item.foodQuantity > 1) {
            state.quantity -= 1;
            item.foodQuantity -= 1;
            state.price -= action.payload.price;
            state.total -= action.payload.price;
          } else {
            state.products = state.products.filter(
              (item) => item.product_name !== action.payload.product_name
            );
            state.quantity -= 1;
            state.price -= action.payload.price;
            state.total -= action.payload.price;
          }
        }
      });
    },
  },
});

export const { addProduct, reset, quantityDecrease, quantityIncrease } =
  cartSlice.actions;
export default cartSlice.reducer;
