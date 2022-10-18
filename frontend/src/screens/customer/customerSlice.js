import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantId: "",
  cartItems: [],
  deliverySelected: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload.restaurantId;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
    setDeliverySelected: (state, action) => {
      state.deliverySelected = action.payload;
    },
  },
});

export const { setRestaurantId, setCartItems, setDeliverySelected } =
  customerSlice.actions;

export const selectRestaurantId = (state) => state.customer.restaurantId;
export const selectCartItems = (state) => state.customer.cartItems;
export const selectDeliverySelected = (state) =>
  state.customer.deliverySelected;

export default customerSlice.reducer;
