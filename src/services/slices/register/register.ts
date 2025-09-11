import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserApi } from '@api';
import { TUser, TAuthResponse } from '@utils-types';

type TRegisterState = {
  user: TUser | null;
  isLoading: boolean;
  isError: boolean;
};

export const initialState: TRegisterState = {
  user: null,
  isLoading: false,
  isError: false
};

export const register = createAsyncThunk<
  TAuthResponse,
  { name: string; email: string; password: string }
>('profile/register', registerUserApi);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  selectors: {
    selectIsError: (state: TRegisterState) => state.isError,
    selectIsLoading: (state: TRegisterState) => state.isLoading,
    selectUser: (state: TRegisterState) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user; // берем только user из TAuthResponse
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  }
});

export default registerSlice;
