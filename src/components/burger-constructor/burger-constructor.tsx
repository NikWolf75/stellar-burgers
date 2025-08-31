import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';

import {
  getItemsConstructor,
  getItemsForOrder
} from '../../services/slices/ingredientsSlice';

import {
  orderBurger,
  getOrderRequest,
  getOrderModalData,
  resetOrderModalData
} from '../../services/slices/orderSlice';

import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(getUser);
  const orderInProgress = useSelector(getOrderRequest);
  const modalOrderInfo = useSelector(getOrderModalData);
  const burgerItems = useSelector(getItemsConstructor);
  const itemsToSend = useSelector(getItemsForOrder);

  const handleOrder = () => {
    if (orderInProgress || !burgerItems.bun) return;

    if (!userData) {
      navigate('/login');
      return;
    }

    if (itemsToSend) {
      dispatch(orderBurger(itemsToSend as string[]));
    }
  };

  const handleCloseModal = () => {
    dispatch(resetOrderModalData());
    navigate('/feed');
  };

  const totalPrice = useMemo(() => {
    const bunPrice = burgerItems.bun ? burgerItems.bun.price * 2 : 0;
    const ingredientsPrice = burgerItems.ingredients.reduce(
      (acc: number, ing: TConstructorIngredient) => acc + ing.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [burgerItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderInProgress}
      constructorItems={burgerItems}
      orderModalData={modalOrderInfo}
      onOrderClick={handleOrder}
      closeOrderModal={handleCloseModal}
    />
  );
};
