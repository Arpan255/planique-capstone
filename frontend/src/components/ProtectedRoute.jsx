import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// ProtectedRoute checks if the user is authenticated
function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('authToken');  // Check if the user has an auth token

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          Component  // If the user is authenticated, render the component
        ) : (
          <Navigate to="/login" />  // Otherwise, redirect to the login page
        )
      }
    />
  );
}

export default ProtectedRoute;
