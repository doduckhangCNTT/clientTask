import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function ProtectedRoute({ children, redirectTo }) {
  // let isAuthenticated = getAuth();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
