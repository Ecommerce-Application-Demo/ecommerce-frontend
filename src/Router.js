import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import NotFound from './pages/Not-found';
import AccountImformation from './nested_pages/Account-imformation-page';
import ProductAdminPage from './pages/product-admin-portal-page';
import ProtectedRoute from './api/utilities/ProtectedRoute';
import ProtectedRouteLogin from './api/utilities/ProtectedRoute-loginFLow';
import SingleProductPage from './pages/Single-product-page';
const Router = () => {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login-signup' element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>} />
    <Route path="/signup" element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>} />
    <Route path="/otp-verification" element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>} />
    <Route path='/login' element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>} />
    <Route path='/loading' element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>} />
    <Route path='/my' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/address' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/profile' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/return' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/cancelation' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/order' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/my/payment' element={<ProtectedRoute><AccountImformation /></ProtectedRoute>} />
    <Route path='/product' element={<SingleProductPage />} />
    <Route path='/product-admin' element={<ProductAdminPage />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  )
}

export default Router;