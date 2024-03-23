import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async (args, { dispatch }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/items', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Request to API failed!');
  } catch (err) {
    console.log(err);
  }
  return {};
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    editItems: (state, action) => {
      state.items.data = state.items.data.map((item) => {
        if (item.name !== action.payload.name) return item;
        return action.payload;
      });
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectItems = (state) => state.items.items;
export const selectIsItemsLoading = (state) => state.items.isLoading;
export const selectHasItemsError = (state) => state.items.hasError;

export const { editItems } = itemsSlice.actions;

export default itemsSlice.reducer;
