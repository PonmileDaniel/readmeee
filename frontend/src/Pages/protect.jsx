// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const documentId = sessionStorage.getItem('documentId');

  // If there is no document ID, redirect to the upload page
  if (!documentId) {
    return <Navigate to="/upload" replace />;
  }

  // Otherwise, allow access to the chat page
  return children;
};

export default ProtectedRoute;
