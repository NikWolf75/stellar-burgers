import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { getIngredients, fetchIngredients } from '../../services/slices/ingredientsSlice';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector(getIngredients);
  const { id: ingredientId } = useParams();

  useEffect(() => {
    if (ingredientsList.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [ingredientsList.length, dispatch]);

  const currentIngredient = ingredientsList.find((el) => el._id === ingredientId);

  if (!currentIngredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={currentIngredient} />;
};
