import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../screens/customer/customerSlice";
import authReducer from "../screens/shared/auth/authSlice";

const loadState = () => {
  try {
    const loadedState = localStorage.getItem("state");

    if (loadedState === null) {
      return undefined;
    }

    return JSON.parse(loadedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const persistedState = loadState();

export const store = configureStore({
  reducer: { auth: authReducer, customer: customerReducer },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
