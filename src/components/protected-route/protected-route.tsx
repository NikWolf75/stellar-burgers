import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const currentUser = useSelector(getUser);
  const authChecked = useSelector(getIsAuthChecked);
  const currentLocation = useLocation();

  if (!authChecked) return <Preloader />;

  if (!onlyUnAuth && !currentUser) {
    return <Navigate replace to="/login" state={{ from: currentLocation }} />;
  }

  if (onlyUnAuth && currentUser) {
    const redirectTo = currentLocation.state?.from || { pathname: '/' };
    return <Navigate replace to={redirectTo} />;
  }

  return children;
};
