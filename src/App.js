import './app.scss'
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import LoginSignUp from './pages/Login-SignUp';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import NotFound from './pages/Not-found';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login-signup' element={<LoginSignUp />}/>
      <Route path='/signup' element={<LoginSignUp />}/>
      <Route path='/login' element={<LoginSignUp />}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
