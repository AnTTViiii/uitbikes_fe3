import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Notification from './pages/Notification';
import User from './pages/User';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';
import ProductDetail from './components/Product/ProductDetail';
import SearchResult from './pages/SearchResult';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthed } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthed ? (
          <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='product/*' element={<ProductDetail />} />
            <Route path='about' element={<About />} />
            <Route path='cart' element={<Cart />} />
            <Route path='notify' element={<Notification />} />
            <Route path='user' element={<User />} />
            <Route path='user/edit' element={<User />} />
            <Route path='user/password' element={<User />} />
            <Route path='user/charge' element={<User />} />
            <Route path='user/purchase' element={<User />} />
            <Route path='user/transaction' element={<User />} />
            <Route path='search' element={<SearchResult />} />
            <Route path='*' element={<Home />} />
          </Route>
        ) : (
          <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='product/' element={<ProductDetail />} />
            <Route path='about' element={<About />} />
            <Route path='register' element={<Register />} />
            <Route path='signin' element={<Signin />} />
            <Route path='cart' element={<Signin />} />
            <Route path='user' element={<Signin />} />
            <Route path='resetpw' element={<ResetPassword />} />
            <Route path='search' element={<SearchResult />} />
            <Route path='*' element={<Home />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;