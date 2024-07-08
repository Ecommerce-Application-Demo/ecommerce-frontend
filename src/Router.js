import React, { Suspense, startTransition } from 'react';
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
import OrderSection from './nested_pages/OrderSection';

// const MfApp = React.lazy(() => import('MicroFrontend/App'));

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PageTransition><Home /></PageTransition>} />
      <Route path='/login-signup' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path="/signup" element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path="/otp-verification" element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/login' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/loading' element={<ProtectedRouteLogin><PageTransition><LoginSignUp /></PageTransition></ProtectedRouteLogin>} />
      <Route path='/my/*' element={<ProtectedRoute><PageTransition><AccountInformation /></PageTransition></ProtectedRoute>} />
      <Route path='/product/:styleName/:styleId/buy' element={<PageTransition><SingleProductPage /></PageTransition>} />
      <Route path='/product-admin' element={<PageTransition><ProductAdminPage /></PageTransition>} />
      <Route path='/my/dashboard' element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
      <Route path='/products' element={<ProductListingPage />} />
      <Route
        path='/checkout/cart'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PageTransition>
              {/* {startTransition(() => ( */}
                <OrderSection />
              {/* ))} */}
            </PageTransition>
          </Suspense>
        }
      />
      <Route path='/checkout/payment' element={<ProtectedRoute><PageTransition><OrderSection /></PageTransition></ProtectedRoute>} />
      <Route path='*' element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );
};

export default Router;
