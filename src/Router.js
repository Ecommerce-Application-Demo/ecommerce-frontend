import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomRoute from './api/utilities/CustomRoute';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import NotFound from './pages/Not-found';
import AccountInformation from './nested_pages/Account-imformation-page';
import Dashboard from './pages/Dashboard-page';
import ProductAdminPage from './pages/product-admin-portal-page';
import SingleProductPage from './pages/Single-product-page';
import PageTransition from './uiHelper/general-page-transition';
import ProtectedRouteLogin from './api/utilities/ProtectedRoute-loginFLow';
import ProtectedRoute from './api/utilities/ProtectedRoute';
import ProductListingPage from './pages/product-listing-page';

const Router = () => {
  return (
    <Routes>
      {/* <CustomRoute path='/' component={Home} />
      <CustomRoute path='/login-signup' component={LoginSignUp} />
      <CustomRoute path='/signup' component={LoginSignUp} />
      <CustomRoute path='/otp-verification' component={LoginSignUp} />
      <CustomRoute path='/login' component={LoginSignUp} />
      <CustomRoute path='/loading' component={LoginSignUp} />
      <CustomRoute path='/my/*' component={AccountInformation} isPrivate />
      <CustomRoute path='/product' component={SingleProductPage} />
      <CustomRoute path='/product-admin' component={ProductAdminPage} isPrivate />
      <CustomRoute path='*' component={NotFound} /> */}
      <Route path='/' element={<PageTransition><Home /></PageTransition>} />
      <Route path='/login-signup' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path="/signup" element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path="/otp-verification" element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/login' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/loading' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/my/*' element={<ProtectedRoute><PageTransition><AccountInformation /></PageTransition></ProtectedRoute>} />
      <Route path='/product' element={<PageTransition><SingleProductPage /></PageTransition>} />
      <Route path='/product-admin' element={<PageTransition><ProductAdminPage /></PageTransition>} />
      <Route path='/my/dashboard' element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
      <Route path='/product-listing' element={<PageTransition><ProductListingPage /></PageTransition>} />
      <Route path='*' element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );
};

export default Router;
