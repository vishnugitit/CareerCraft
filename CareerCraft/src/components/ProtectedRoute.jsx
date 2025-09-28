import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* Simple protected route example that redirects to /login if not authenticated */
export default function ProtectedRoute({ children }){
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
