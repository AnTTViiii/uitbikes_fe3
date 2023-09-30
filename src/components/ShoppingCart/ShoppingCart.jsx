import React, { useState } from 'react'
import Cart from '../Data/Cart'
import { dot3digits } from '../functions/functions';
import { IconButton } from '@mui/material';
import { DeleteForeverRounded } from '@mui/icons-material';
import Customer from '../Data/Customer'
import { getItemQuantity } from '../functions/functions';
import './shopping-cart.css'
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  // const listProducts = [];
  const [listProducts, setListProducts] = useState([]);
  
  const pushToBuyList = (e, {item}) => {
    // const { value, checked } = e;
    // console.log(`${value} is ${checked}`);

    // if (checked) {
    //   setListProducts([...listProducts, value]);
    // }
    // else {
    //   setListProducts([listProducts.filter((e) => e.cart_id !== value.cart_id)])
    // }

    if (e.target.checked) {
      setListProducts([
        ...listProducts, item,
      ]);
    } else {
      // remove from list
      setListProducts(
        listProducts.filter((product) => product.cart_id !== item.cart_id),
      );
    }

    console.log(listProducts);
  }
  return (
    <div className='shopping-cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <h2>GIỎ HÀNG</h2>
          <p>({Cart.length} sản phẩm)</p>
        </div>
        {
          Cart.map((item) => (
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
          <p><Link to={`/product/${item.product.p_id}`}>{item.product.name}</Link></p>
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
  const getTotal = (item) => {
    let total = 0;
    item.map((i) => (total += i.product.price * i.quantity));
    return total;
  }
  // const getItemQuantity = (item) => {
  //   let qty = 0;
  //   item.map((i) => (qty += i.quantity));
  //   return qty;
  // }
  const payment = (balance, total) => {
    if (balance >= total) {
      localStorage.setItem("invoice", JSON.stringify(item));
    } else alert('Số dư của khách hàng không đủ! Vui lòng nạp thêm để tiếp tục thanh toán.');
  }
  return (
    <div className='summary-invoice'>
      <p>Sản phẩm: <span>{getItemQuantity(item)}</span></p>
      <p>Tạm tính: <span>{dot3digits(getTotal(item))} đ</span></p>
      <p>Phí vận chuyển:<span>250.000 đ</span></p>
      <hr/>
      <p>Tổng cộng: <span>{dot3digits(getTotal(item)+250000)} đ</span></p>
      <p>Số dư: <span>{dot3digits(Customer.balance)} đ</span></p>
      <div onClick={() => payment(Customer.balance, getTotal(item))}>Thanh toán</div>
    </div>
  )
}
