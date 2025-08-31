import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';

import { addIngredient } from '../../services/slices/ingredientsSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const routeLocation = useLocation();

    const onAddIngredient = () => {
      if (ingredient) {
        dispatch(addIngredient(ingredient));
      }
    };

    const locationState = { background: routeLocation };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={locationState}
        handleAdd={onAddIngredient}
      />
    );
  }
);
