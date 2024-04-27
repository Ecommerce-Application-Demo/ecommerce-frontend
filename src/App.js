import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useBreakpoints from './api/utilities/responsive';
import Navbar from './components/Navbar';
import NavbarProductAdmin from './components/navbar-product-admin';
import FooterPage from './pages/footer-page';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import NotFound from './pages/Not-found';
import AccountImformation from './nested_pages/Account-imformation-page';
import ProductAdminPage from './pages/product-admin-portal-page';
import LoginPopupMobile from './components/navbar/login-popup-mobile';
import ProtectedRoute from './api/utilities/ProtectedRoute';
import ProtectedRouteLogin from './api/utilities/ProtectedRoute-loginFLow';
import SingleProductPage from './pages/Single-product-page';

function App() {
  const routeParams = useLocation().pathname;
  const { isMobile } = useBreakpoints();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const routeValidationForLoginPopup = ['/login-signup', '/login', '/signup', '/otp-verification'].includes(routeParams);

  useEffect(() => {
    if (!isLoggedIn && isMobile && !routeValidationForLoginPopup) {
      setTimeout(() => {
        setOpenLoginPopup(true);
      }, 6000);
    }
  }, [isMobile, isLoggedIn, routeParams, routeValidationForLoginPopup]);

  useEffect(() => {
    setOpenLoginPopup(false);
  }, [routeParams]);

  return (
    <>
      {!routeParams.includes('/product-admin') && <Navbar />}
      {routeParams.includes('/product-admin') && <NavbarProductAdmin />}
      {openLoginPopup ? <LoginPopupMobile setOpenLoginPopup={setOpenLoginPopup} /> : null}
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
      <FooterPage />
    </>
  );
}

export default App;
