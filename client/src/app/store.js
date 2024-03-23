import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
  devTools: false,
});
