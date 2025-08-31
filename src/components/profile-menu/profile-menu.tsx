import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const currentPath = location.pathname;

  return <ProfileMenuUI handleLogout={handleLogout} pathname={currentPath} />;
};
