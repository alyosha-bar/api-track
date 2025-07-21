import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingHome from '../loading/LoadingHome';

const RequireAuth = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Custom loading UIs based on route
    switch (location.pathname) {
      case '/dashboard':
        return <div>Loading dashboard...</div>;
      case '/home':
        return <LoadingHome />;
      case '/profile':
        return <div>Loading profile...</div>;
      default:
        return <div>Loading...</div>;
    }
  }

  return isSignedIn ? children : <Navigate to="/" />;
};

export default RequireAuth;
