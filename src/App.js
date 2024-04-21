import './app.scss';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import {Routes, BrowserRouter, Route, useLocation} from 'react-router-dom';
import NotFound from './pages/Not-found';
import AccountImformation from './nested_pages/Account-imformation-page';
import FooterPage from './pages/footer-page';
import ProtectedRoute from './api/utilities/ProtectedRoute';
import ProtectedRouteLogin from './api/utilities/ProtectedRoute-loginFLow';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SingleProductPage from './pages/Single-product-page';
import ProductAdminPage from './pages/product-admin-portal-page';
import NavbarProductAdmin from './components/navbar-product-admin';
import AddCategories from './components/product-admin-portal/add-categories';
import AddProduct from './components/product-admin-portal/add-product';
import AddProductSku from './components/product-admin-portal/add-product-sku';
import AllProducts from './components/product-admin-portal/get-all-products';

function App() {
  // let isLoggedIn = useSelector(state=>state.user.isLoggedIn);
// const jwtToken = useSelector(state=>state.user.JWTtoken);
//   useEffect(()=>{
//     ValidateJWT(jwtToken);
//   },[])
const routeParams=useLocation().pathname;

  console.log(routeParams);
  return (
    <>
    {!routeParams.includes('/product-admin') && <Navbar/>}
    {routeParams.includes('/product-admin') && <NavbarProductAdmin/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login-signup' element={<ProtectedRouteLogin><LoginSignUp /></ProtectedRouteLogin>}/>
      <Route path="/signup" element={<ProtectedRouteLogin><LoginSignUp/></ProtectedRouteLogin>} />
      <Route path="/otp-verification" element={<ProtectedRouteLogin><LoginSignUp/></ProtectedRouteLogin>} />
      <Route path='/login' element={<ProtectedRouteLogin><LoginSignUp/></ProtectedRouteLogin>}/>
      <Route path='/loading' element={<ProtectedRouteLogin><LoginSignUp/></ProtectedRouteLogin>}/>
      <Route path='/my' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/address' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/profile' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/return' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/cancelation' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/order' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/payment' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/product' element={<SingleProductPage/>}/>
      <Route path='/product-admin' element={<ProductAdminPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <FooterPage/>
    </>
  );
}

export default App;
