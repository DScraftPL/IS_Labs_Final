import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  var role = ''

  if(state.user){
    const decodedToken:any = jwtDecode(state.user?.token)
    role = decodedToken.role 
  }

  if(role !== 'admin'){
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;