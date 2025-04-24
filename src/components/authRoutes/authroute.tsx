import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();

  if (state.isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return <>{children}</>;
};

export default AuthRoute;