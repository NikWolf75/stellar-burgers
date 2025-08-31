import { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { getItemsConstructor } from '../../services/slices/ingredientsSlice';

import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';

export const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategoryProps>(
  ({ title, titleRef, ingredients }, ref) => {
    const constructorData = useSelector(getItemsConstructor);

    const ingredientCounters = useMemo(() => {
      const map: Record<string, number> = {};

      constructorData.ingredients.forEach((ing: TIngredient) => {
        map[ing._id] = (map[ing._id] ?? 0) + 1;
      });

      if (constructorData.bun) {
        map[constructorData.bun._id] = 2;
      }

      return map;
    }, [constructorData]);

    return (
      <IngredientsCategoryUI
        title={title}
        titleRef={titleRef}
        ingredients={ingredients}
        ingredientsCounters={ingredientCounters}
        ref={ref}
      />
    );
  }
);
