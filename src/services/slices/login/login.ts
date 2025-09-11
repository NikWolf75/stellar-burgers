import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserApi } from '@api'; // Убедись, что путь правильный
import { TUser, TAuthResponse } from '@utils-types'; // Путь правильный

type TLoginState = {
  isError: boolean;
  user: TUser | null;
};

export const initialState: TLoginState = {
  isError: false,
  user: null
};

// AsyncThunk для логина
export const login = createAsyncThunk<
  TAuthResponse,
  { email: string; password: string }
>(
  'login/login', // Исправил имя действия
  async (data) => {
    const response = await loginUserApi(data);
    return response;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isError = true;
        state.user = null;
      });
  }
});

export const selectUser = (state: { login: TLoginState }) => state.login.user;
export const selectIsError = (state: { login: TLoginState }) =>
  state.login.isError;

export default loginSlice;
