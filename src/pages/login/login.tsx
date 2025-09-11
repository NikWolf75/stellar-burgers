import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store/store';
import { selectIsLoading } from '../../services/slices/profile/profile';
import { Preloader } from '@ui';
import loginSlice, {
  login,
  selectUser,
  selectIsError
} from '../../services/slices/login/login'; // Экспортируем селекторы из login

export const Login: FC = () => {
  const isLoading = useSelector(selectIsLoading); // Вызываем селектор из profile
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError); // Используем селектор, который экспортирован из loginSlice

  const handleSubmit = (e: SyntheticEvent) => {
    const loginData = { email, password };
    dispatch(login(loginData)); // Отправляем login
    e.preventDefault();
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={isError ? 'Неверный логин или пароль' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
