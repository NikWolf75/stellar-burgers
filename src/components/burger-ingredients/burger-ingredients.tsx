import { FC, useState, useRef, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, getIngredients } from '../../services/slices/ingredientsSlice';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(getIngredients);

  // подгрузка ингредиентов
  useEffect(() => {
    if (allIngredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [allIngredients.length, dispatch]);

  // фильтрация ингредиентов
  const buns = useMemo(
    () => allIngredients.filter((el) => el.type === 'bun'),
    [allIngredients]
  );
  const fillings = useMemo(
    () => allIngredients.filter((el) => el.type === 'main'),
    [allIngredients]
  );
  const sauces = useMemo(
    () => allIngredients.filter((el) => el.type === 'sauce'),
    [allIngredients]
  );

  // состояние активного таба
  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  // ссылки на заголовки
  const bunHeaderRef = useRef<HTMLHeadingElement>(null);
  const mainHeaderRef = useRef<HTMLHeadingElement>(null);
  const sauceHeaderRef = useRef<HTMLHeadingElement>(null);

  // observer для секций
  const [bunSectionRef, bunInView] = useInView({ threshold: 0 });
  const [mainSectionRef, mainInView] = useInView({ threshold: 0 });
  const [sauceSectionRef, sauceInView] = useInView({ threshold: 0 });

  // переключение табов при скролле
  useEffect(() => {
    if (bunInView) {
      setActiveTab('bun');
    } else if (sauceInView) {
      setActiveTab('sauce');
    } else if (mainInView) {
      setActiveTab('main');
    }
  }, [bunInView, mainInView, sauceInView]);

  // клик по табу
  const handleTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);

    if (tab === 'bun') bunHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') mainHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') sauceHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={fillings}
      sauces={sauces}
      titleBunRef={bunHeaderRef}
      titleMainRef={mainHeaderRef}
      titleSaucesRef={sauceHeaderRef}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabClick}
    />
  );
};
