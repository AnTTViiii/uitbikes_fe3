import React, { useEffect, useState } from 'react'
import Cart from '../Data/Cart'
import { Transition, dot3digits } from '../functions/functions';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
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

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleRemove = async() => {
    await axios.delete(`http://localhost:9090/api/carts/${item.id}`)
      .then((res) => {
        setOpen(false)
      })
  }

  const handleIncreaseQty = async(num) => {
    await axios.put(`http://localhost:9090/api/carts/${item.id}/quantity/${item.quantity+num}`)
  }

  return (
    <div className='cart-item'>
      <div className="cart-item-img">
        <img src={item.product.image} alt={item.product.name} />
      </div>
      
      <div className="cart-item-detail">
          <p><Link to={`/product/${item.product.name}/${item.product.id}`}>{item.product.name}</Link></p>
          <p>Màu: {item.product.color}</p>
          <p>{dot3digits(item.product.price)} đ</p>
      </div>
      
      <div className="counter">
          <div onClick={() => {decrementCount(); handleIncreaseQty(-1)}}>-</div>
          <div>{count}</div>
          <div onClick={() => {incrementCount(item.product.quantity); handleIncreaseQty(1)}}>+</div>
      </div>

      <div className="total">{dot3digits(item.product.price * count)} đ</div>

      <IconButton className='cart-item-remove' onClick={() => setOpen(true)}>
        <DeleteForeverRounded />
      </IconButton>

      <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}
      >
        <DialogTitle>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</DialogTitle>
        <DialogActions>
          <Button className='themeColor noneTextTransform' onClick={handleRemove}>Chắc chắn</Button>
          <Button className='bgColor noneTextTransform' onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export const SummaryInvoice = ({item}) => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];
  const navigate = useNavigate();

  const getTotal = (item) => {
    let total = 0;
    item.map((i) => (total += i.product.price * i.quantity));
    return total;
  }

  const payment = async(balance, total) => {
    const cus = user.customer;
    const invoice = {
      customer: cus,
      total: total,
      details: item
    }
    await axios.post(`http://localhost:9090/api/invoices/create`, invoice)
      .then((res) => {
        item.map((cart) => (
          axios.delete(`http://localhost:9090/api/carts/${cart.id}`)
        ))
        axios.get(`http://localhost:9090/api/accounts/${user.username}`)
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
          })
        setNofification("Đơn hàng đã được tạo.")
        setTimeout(() => {handleClose(); navigate('/user/purchase')}, 2500)
      }).catch((error) => {
        console.log(error);
        setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
      });
  }

  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    navigate('/user/edit')
  }

  const handleClose = () => setOpen(false);

  const [notify, setNotify] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const setAlertError = (error) => {
    setNotify(error);
    setShowAlert(true);
  };

  const setNofification = (success) => {
      setNotify(success);
      setShowNotify(true);
  };

  const handleCloseNotify = () => {
    setShowAlert(false);
    setShowNotify(false);
  };

  const [openConfirmPurchasedDialog, setOpenConfirmPurchasedDialog] = useState(false);
  const handleCloseConfirmPurchasedDialog = () => setOpenConfirmPurchasedDialog(false);
  const handleOpenConfirmPurchasedDialog = (balance, total) => {
    if (item.length === 0) {
      alert('Vui lòng chọn ít nhất 1 sản phẩm!');
    } else if (balance >= total) {
      const cus = user.customer;
      if (!cus.phone || !cus.address || !cus.idNumber || !cus.name) {
        setOpen(true);
      } else {
        setOpenConfirmPurchasedDialog(true);
      }
    } else alert('Số dư của khách hàng không đủ! Vui lòng nạp thêm để tiếp tục thanh toán.');
  }

  return (
    <div className='summary-invoice'>
      <p>Sản phẩm: <span>{getItemQuantity(item)}</span></p>
      <p>Tạm tính: <span>{dot3digits(getTotal(item))} đ</span></p>
      <p>Phí vận chuyển:<span>250.000 đ</span></p>
      <hr/>
      <p>Tổng cộng: <span>{dot3digits(getTotal(item)+250000)} đ</span></p>
      <p>Số dư: <span>{dot3digits(user.customer.balance)} đ</span></p>
      <Button className='themeColor noneTextTransform' onClick={() => handleOpenConfirmPurchasedDialog(user.customer.balance, getTotal(item))}>Thanh toán</Button>

      <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}
      >
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

      <Dialog open={showAlert ? showAlert : showNotify}
              onClose={handleCloseNotify}>
        <Alert onClose={handleCloseNotify} severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
          { notify }
        </Alert>
      </Dialog>

      <Dialog open={openConfirmPurchasedDialog} TransitionComponent={Transition}
        keepMounted onClose={handleCloseConfirmPurchasedDialog}
      >
        <DialogTitle>Bạn có chắc chắn muốn đặt hàng?</DialogTitle>
        <DialogActions>
          <Button className="themeColor noneTextTransform" onClick={() => payment(user.customer.balance, getTotal(item))}>Chắc chắn</Button>
          <Button className="bgColor noneTextTransform" onClick={handleCloseConfirmPurchasedDialog}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
