import React, { useEffect, useState } from 'react'
import Cart from '../Data/Cart'
import { Transition, dot3digits } from '../functions/functions';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { DeleteForeverRounded } from '@mui/icons-material';
import Customer from '../Data/Customer'
import { getItemQuantity } from '../functions/functions';
import './shopping-cart.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const [data, setData] = useState([]);
  const [cartQty, setCartQty] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];
  
  const pushToBuyList = (e, {item}) => {
    if (e.target.checked) {
      setListProducts([...listProducts, item,]);
    } else {
      setListProducts(listProducts.filter((product) => product.cart_id !== item.cart_id),);
    }

    console.log(listProducts);
  }

  useEffect(() => {
    axios.get(`http://localhost:9090/api/carts/customer/${user.customer.id}`)
      .then((res) => {
        setData(res.data)
        setCartQty(getItemQuantity(res.data))
      })
      .catch((err) => console.log(err))
  }, [data, cartQty]);

  return (
    <div className='shopping-cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <h2>GIỎ HÀNG</h2>
          <p>({cartQty} sản phẩm)</p>
        </div>
        {
          data.map((item) => (
            <div className='item-row'>
              <input type='checkbox' value={(listProducts)} onChange={(e) => {pushToBuyList(e, {item})}} />
              <CartItem item={item} />
            </div>
          ))
        }
      </div>
      <div className="summary-invoice-container">
        <h2>THÔNG TIN ĐƠN HÀNG</h2>
        <SummaryInvoice item={listProducts} />
      </div>
    </div>
  )
}

export default ShoppingCart

export const CartItem = ({item}) => {
  let [count, setCount] = useState(item.quantity);

  function incrementCount(x) {
      count = count < x ? count + 1 : x;
      setCount(count);
  }

  function decrementCount() {
      count = count > 1 ? count - 1 : 1;
      setCount(count);
  }
  return (
    <div className='cart-item'>
      <div className="cart-item-img">
        <img src={item.product.image} alt={item.product.name} />
      </div>
      
      <div className="cart-item-detail">
          <p><Link to={`/product/${item.product.name}`}>{item.product.name}</Link></p>
          <p>Màu: {item.product.color}</p>
          <p>{dot3digits(item.product.price)} đ</p>
      </div>
      
      <div className="counter">
          <div onClick={decrementCount}>-</div>
          <div>{count}</div>
          <div onClick={() => {incrementCount(item.product.quantity)}}>+</div>
      </div>

      <div className="total">{dot3digits(item.product.price * count)} đ</div>

      <IconButton className='cart-item-remove'>
        <DeleteForeverRounded />
      </IconButton>
    </div>
  )
}

export const SummaryInvoice = ({item}) => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`http://localhost:9090/api/accounts/`)
  // })
  const getTotal = (item) => {
    let total = 0;
    item.map((i) => (total += i.product.price * i.quantity));
    return total;
  }

  const payment = (balance, total) => {
    if (total === 0) {
      alert('Vui lòng chọn ít nhất 1 sản phẩm!');
    } else {
      if (balance >= total) {
        const cus = user.customer;
        if (!cus.phone || !cus.address || !cus.idNumber || !cus.name) {
          setOpen(true);
        }
        localStorage.setItem("invoice", JSON.stringify(item));
      } else alert('Số dư của khách hàng không đủ! Vui lòng nạp thêm để tiếp tục thanh toán.');
    }
  }

  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    navigate('/user/edit')
  }

  const handleClose = () => setOpen(false);

  return (
    <div className='summary-invoice'>
      <p>Sản phẩm: <span>{getItemQuantity(item)}</span></p>
      <p>Tạm tính: <span>{dot3digits(getTotal(item))} đ</span></p>
      <p>Phí vận chuyển:<span>250.000 đ</span></p>
      <hr/>
      <p>Tổng cộng: <span>{dot3digits(getTotal(item)+250000)} đ</span></p>
      <p>Số dư: <span>{dot3digits(user.customer.balance)} đ</span></p>
      <div onClick={() => payment(user.customer.balance, getTotal(item))}>Thanh toán</div>

      <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}
      >
        <DialogTitle>{"Cập nhật thông tin tài khoản?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng cập nhật đầy đủ thông tin cá nhân để tiếp tục mua hàng!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNavigate}>Cập nhật</Button>
          <Button onClick={handleClose}>Để sau</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
