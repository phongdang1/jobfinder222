import HomePage from '@/pages/User/Homepage';
import React from 'react'
import { Navigate } from 'react-router-dom';

const RedirectBasedOnRole = ({component}) => {
    const role = localStorage.getItem('roleCode');
  
    // Chuyển hướng dựa trên role
    if (role === 'COMPANY') return <Navigate to="/company/dashboard" />;
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" />;
    
    // Mặc định, role USER hoặc chưa đăng nhập sẽ về homepage
    return component;
  };

export default RedirectBasedOnRole