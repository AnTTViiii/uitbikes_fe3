import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword';
import ChargeRequest from './pages/ChargeRequest';
import EditProfile from './pages/EditProfile';
import EInvoice from './pages/EInvoice';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';
import ProductDetail from './components/Product/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='register' element={<Register />} />
          <Route path='signin' element={<Signin />} />
          <Route path='profile' element={<Profile />} />
          <Route path='cart' element={<Cart />} />
          <Route path='notify' element={<Notification />} />
          <Route path='profile/edit' element={<EditProfile />} />
          <Route path='profile/changepw' element={<ChangePassword />} />
          <Route path='profile/charge' element={<ChargeRequest />} />
          <Route path='product/*' element={<ProductDetail />} />
          <Route path='invoices' element={<EInvoice />} />
          <Route path='resetpw' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;