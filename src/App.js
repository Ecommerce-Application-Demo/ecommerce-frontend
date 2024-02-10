import './app.scss';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import NotFound from './pages/Not-found';
import AccountImformation from './nested_pages/Account-imformation-page';
import FooterPage from './pages/footer-page';
import ProtectedRoute from './api/utilities/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login-signup' element={<LoginSignUp />}/>
      <Route path="/signup" element={<LoginSignUp/>} />
      <Route path="/otp-verification" element={<LoginSignUp/>} />
      <Route path='/login' element={<LoginSignUp />}/>
      <Route path='/loading' element={<LoginSignUp />}/>
      <Route path='/my' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/address' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/profile' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/return' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/cancelation' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/order' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='/my/payment' element={<ProtectedRoute><AccountImformation/></ProtectedRoute>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <FooterPage/>
    </BrowserRouter>
  );
}

export default App;
