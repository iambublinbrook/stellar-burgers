import { useSelector, useDispatch } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import {
  selectIsAuthChecked,
  selectIsUserAuthenticated
} from '../../services/selectors';
import { FC, useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children?: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (unAuthOnly) {
    if (isUserAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      return <Navigate to={from} replace />;
    }
  } else {
    if (!isUserAuthenticated) {
      return <Navigate to='/login' replace state={{ from: location }} />;
    }
  }
  return <>{children}</>;
};
