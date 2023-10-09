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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='product/*' element={<ProductDetail />} />
          <Route path='about' element={<About />} />
          <Route path='register' element={<Register />} />
          <Route path='signin' element={<Signin />} />
          <Route path='cart' element={<Cart />} />
          <Route path='notify' element={<Notification />} />
          <Route path='user' element={<User />} />
          <Route path='user/edit' element={<User />} />
          <Route path='user/password' element={<User />} />
          <Route path='user/charge' element={<User />} />
          <Route path='user/purchase' element={<User />} />
          <Route path='user/transaction' element={<User />} />
          <Route path='resetpw' element={<ResetPassword />} />
          <Route path='search' element={<SearchResult />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;