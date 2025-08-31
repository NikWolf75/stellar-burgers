import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';

import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import {
  swapIngredients,
  removeIngredient
} from '../../services/slices/ingredientsSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const onMoveUp = () => {
      dispatch(swapIngredients({ from: index, to: index - 1 }));
    };

    const onMoveDown = () => {
      dispatch(swapIngredients({ from: index, to: index + 1 }));
    };

    const onRemove = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onRemove}
      />
    );
  }
);
