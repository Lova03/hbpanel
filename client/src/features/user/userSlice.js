import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (args, { dispatch }) => {
  try {
    const response = await axios.get('http://locahost:5000/auth', {
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    logoutUser: (state, action) => {
      state.user = {};
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsUserLoading = (state) => state.user.isLoading;
export const selectHasUserError = (state) => state.user.hasError;

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
