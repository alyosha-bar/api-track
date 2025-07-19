import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return isSignedIn ? children : <Navigate to="/" />;
};

export default RequireAuth;
