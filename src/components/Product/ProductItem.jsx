import React, { useState } from 'react'
import { ShoppingCartRounded } from '@mui/icons-material';
import './product-item.css'
import { IconButton, Snackbar, Alert } from '@mui/material';
import { dot3digits } from '../functions/functions'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductItem = ({item}) => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);

  const setAlertError = (error) => {
      setError(error);
      setShowAlert(true);
  };
  
  const [notify, setNotify] = useState(null);
  const [showNotify, setShowNotify] = useState(notify !== null ? true : false);

  const setNofification = (notify) => {
      setNotify(notify);
      setShowNotify(true);
  };

  async function handleAddToCart () {
    if (isAuthed) {
      const product = { "quantity": 1 }
      try {
        await axios.get(`http://localhost:9090/api/products/${item.id}`)
          .then((res) => {
            if (res.data.quantity > 0) {
              axios.get(`http://localhost:9090/api/carts/customer/${user.customer.id}/product/${item.id}`)
                .then(res1 => {
                  if(res1.data.id === undefined) 
                    axios.post(`http://localhost:9090/api/carts/customer/${user.customer.id}/product/${item.id}`, product)
                  else axios.put(`http://localhost:9090/api/carts/${res1.data.id}/quantity/${res1.data.quantity + 1}`)
                  setNofification('Đã thêm vào giỏ hàng.')
                }).catch((error) => {
                  console.log(error);
                  setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
                });
            } else {
              setNofification('Mẫu màu đã hết. Vui lòng chọn loại màu khác!')
            }
          })
          .catch((err) => {console.log(err)})
      } catch (error) {
        console.log(error);
        setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
      }
    } else navigate("/signin")
  };

  const handleClose = () => {
    setError(null);
    setShowAlert(false);
    setNotify(null);
    setShowNotify(false)
  }

  return (
    <div className='product-item'>
      <div className="product-item-inside">
        <div className="product-item-img">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="product-item-txt">
          <h3><Link to={`/product/${item.name}/${item.id}`}>{item.name}</Link></h3>
          <p>{dot3digits(item.price)} vnđ</p>
          <IconButton className='shopping-icon' onClick={handleAddToCart}>
            <ShoppingCartRounded />
          </IconButton>
        </div>
      </div>
      <Snackbar open={showAlert ? showAlert : showNotify} autoHideDuration={3000} 
                onClose={handleClose}>
        <Alert onClose={handleClose} severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
          { showAlert ? error : notify }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ProductItem
