import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { userSlice } from './slices/userSlice';
import { ordersSlice } from './slices/orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector
} from 'react-redux';

// объединяем редьюсеры
const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// типы для TypeScript
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// хуки с типизацией
export const useDispatch: () => AppDispatch = () => reduxDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = reduxSelector;

export default store;
