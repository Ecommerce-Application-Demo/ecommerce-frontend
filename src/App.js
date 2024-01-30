import './app.scss'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import NotFound from './pages/Not-found';
import AccountImformation from './nested_pages/Account-imformation-page';
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
      <Route path='/my' element={<AccountImformation/>}/>
      <Route path='/my/address' element={<AccountImformation/>}/>
      <Route path='/my/profile' element={<AccountImformation/>}/>
      <Route path='/my/return' element={<AccountImformation/>}/>
      <Route path='/my/cancelation' element={<AccountImformation/>}/>
      <Route path='/my/order' element={<AccountImformation/>}/>
      <Route path='/my/payment' element={<AccountImformation/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
