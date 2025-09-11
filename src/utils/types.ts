export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

// src/services/types/index.ts
export type TUser = {
  name: string;
  email: string;
  password?: string; // <- сделал необязательным
};

// Ответ от сервера при логине
export type TAuthResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
