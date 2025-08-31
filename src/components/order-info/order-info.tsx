import { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { fetchIngredients, getIngredients } from '../../services/slices/ingredientsSlice';
import { getOrderByNumber, getOrderByNumberSelector, getOrderRequest } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isOrderLoading = useSelector(getOrderRequest);
  const orderData = useSelector(getOrderByNumberSelector) as TOrder;
  const ingredientsList = useSelector(getIngredients) || [];

  const orderNumber = Number(location.pathname.split('/').pop());

  // получение данных заказа
  useEffect(() => {
    dispatch(getOrderByNumber(orderNumber));
  }, [dispatch, orderNumber]);

  // подгрузка ингредиентов
  useEffect(() => {
    if (!ingredientsList.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredientsList, dispatch]);

  const detailedOrder = useMemo(() => {
    if (!orderData || !ingredientsList.length || !orderData.ingredients) return null;

    const dateCreated = new Date(orderData.createdAt);

    type IngredientCountMap = Record<string, TIngredient & { count: number }>;

    const ingredientsMap: IngredientCountMap = orderData.ingredients.reduce(
      (acc, ingId) => {
        const existing = acc[ingId];
        if (existing) {
          existing.count++;
        } else {
          const ingredient = ingredientsList.find((i) => i._id === ingId);
          if (ingredient) acc[ingId] = { ...ingredient, count: 1 };
        }
        return acc;
      },
      {} as IngredientCountMap
    );

    const totalPrice = Object.values(ingredientsMap).reduce(
      (sum, ing) => sum + ing.price * ing.count,
      0
    );

    return { ...orderData, ingredientsInfo: ingredientsMap, date: dateCreated, total: totalPrice };
  }, [orderData, ingredientsList]);

  if (!detailedOrder || isOrderLoading) return <Preloader />;

  return <OrderInfoUI orderInfo={detailedOrder} />;
};
