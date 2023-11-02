import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Transition, dot3digits } from '../functions/functions'
import './product-detail.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];

  const path = location.pathname.split("/");
  let name = path[2].replace(/%20/g, ' ');

  const [data, setData] = useState([]); 
  const [details, setDetails] = useState([]);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9090/api/products/detail/names/" + name)
      .then((response) => {
        setData(response.data);
        setDetails(response.data.detail);
      });
  }, [name, data, details]);

  const [descriptionToggle,  setDescriptionToggle] = useState(0);
  const toggleTab = (index) => {
    setDescriptionToggle(index);
  };
  const Page = (descriptionToggle === 0) ? ProductDescription : ProductSpecification;

  let [count, setCount] = useState(1);

  function incrementCount(x) {
    count = count < x ? count + 1 : x;
    setCount(count);
  }

  function decrementCount() {
    count = count > 1 ? count - 1 : 1;
    setCount(count);
  }

  const [colorSelected, setColorSelected] = useState(0);
  const [price, setPrice] = useState(null);

  const [notify, setNotify] = useState(null);
  const [actionMsg, setActionMsg] = useState(null);
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

  const [openRemindUpdateInfoDialog, setOpenRemindUpdateInfoDialog] = useState(false);
  const [link, setLink] = useState('')
  const handleNavigate = () => {
    navigate(link)
  }

  const handleCloseRemminderDialog = () => setOpenRemindUpdateInfoDialog(false);

  const handlePurchased = async() => {
    // details.map((item, idx) => idx === colorSelected && (setProductId(item.id), setPrice(item.price)))
    let total = count * price;
    if (isAuthed) {
      const cus = user.customer;
      if (!cus.phone || !cus.address || !cus.idNumber || !cus.name) {
        setNotify('Vui lòng cập nhật đầy đủ thông tin cá nhân để tiếp tục mua hàng!')
        setLink('/user/edit')
        setActionMsg('Cập nhật')
        setOpenRemindUpdateInfoDialog(true);
      } else {
        if (cus.balance < total) {
          setNotify('Số dư của khách hàng không đủ! Vui lòng nạp thêm để tiếp tục thanh toán.')
          setLink('/user/charge')
          setActionMsg('Nạp tiền')
          setOpenRemindUpdateInfoDialog(true);
        } else {
          const order = {
            total: total,
            customer: cus
          }
          await axios.post(`http://localhost:9090/api/invoices`, order)
            .then((res) => {
              if(res.data.id !== undefined)
                axios.put(`http://localhost:9090/api/invoices/${res.data.id}/product/${productId}/quantity/${count}`)
                  .then((res1) => {setNofification('Đơn hàng đã được tạo.')})
                  .catch((err) => {
                    console.log(err);
                    setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
                  })
              else setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
            }).catch((error) => {
              console.log(error);
              setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
            });
        }
      }
    } else navigate('/signin')
  }

  const handleClose = () => {
    setNotify(null);
    setShowAlert(false);
    setShowNotify(false)
  }

  const handleAddToCart = async() => {
    if (isAuthed) {
      const product = { "quantity": count }
      if (productId == null) {
        details.map((item, idx) => idx === colorSelected && setProductId(item.id))
      } else {
        try {
          await axios.get(`http://localhost:9090/api/carts/customer/${user.customer.id}/product/${productId}`)
            .then(res => {
              if(res.data.id === undefined)
                axios.post(`http://localhost:9090/api/carts/customer/${user.customer.id}/product/${productId}`, product)
              else axios.put(`http://localhost:9090/api/carts/${res.data.id}/quantity/${res.data.quantity + 1}`)
              setNofification('Đã thêm vào giỏ hàng.')
            }).catch((error) => {
              console.log(error);
              setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
            });
        } catch (error) {
          console.log(error);
          setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
        }
        setTimeout(handleClose, 2500);
      }
      
    } else navigate('/signin')
  }

  return (
    <div className='product-detail'>
      <div className="product-detail-img">
        {
          details.map((item, index) => index === colorSelected && (
            <img src={item.image} alt={data.name} />
          ))
        } 
      </div>
      <div className="product-detail-title">
        <h3>{data.name}</h3>
        {
          details.map((item, index) => index === colorSelected && (
            <p>{dot3digits(item.price)} đ</p>
          ))
        }
        <div className="product-color">
          {
            details.map((item, index) => (
              <div className={`color ${colorSelected === index ? ' active' : ''}`} 
                  onClick={(e) => {setColorSelected(index); setProductId(item.id); setPrice(item.price)}}>
                {item.color}
              </div>
            ))
          }
        </div>
        <div className="product-quantity">
          {
            details.map((item, index) => index === colorSelected && (
              <><p>Kho: {item.quantity}</p>
              <div className="counter">
                <div onClick={decrementCount}>-</div>
                <div>{count}</div>
                <div onClick={() => {incrementCount(item.quantity)}}>+</div>
              </div></>
            ))
          }
        </div>
        <div className="shopping-button">
          <Button variant='contained' className="bgMainColor noneTextTransform" onClick={handlePurchased}>Mua ngay</Button>
          <Button variant='contained' className="add-to-cart noneTextTransform" onClick={handleAddToCart}>Thêm vào giỏ</Button>
        </div>

        <Dialog open={showAlert ? showAlert : showNotify}
                onClose={handleClose}>
          <Alert onClose={handleClose} severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
            { notify }
          </Alert>
        </Dialog>

        <Dialog open={openRemindUpdateInfoDialog} TransitionComponent={Transition}
          keepMounted onClose={handleCloseRemminderDialog}
        >
          <DialogTitle>{"Cập nhật thông tin tài khoản?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {notify}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="bgMainColor noneTextTransform" onClick={handleNavigate}>{actionMsg}</Button>
            <Button className="bgColor noneTextTransform" onClick={handleCloseRemminderDialog}>Để sau</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="product-detail-description">
        <div className="product-detail-description-title">
          <div className={descriptionToggle === 0 ? "title active" : "title"} onClick={() => toggleTab(0)}>Mô tả sản phẩm</div>
          <div className={descriptionToggle === 1 ? "title active" : "title"} onClick={() => toggleTab(1)}>Thông số kỹ thuật</div>
        </div>
        <div className="product-detail-description-content">
          <Page item={data} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

export const ProductDescription = ({item}) => {
  return (
    <div className='product-description'>
        {item.describe}
    </div>
  )
}

export const ProductSpecification = ({item}) => {
  return (
    <div className='product-specification'>
      <table cellSpacing={0}>
        <tr>
          <th>Hãng xe</th>
          <td>{item.brand.name}</td>
        </tr>
        <tr>
          <th>Loại xe</th>
          <td>{item.type.name}</td>
        </tr>
        <tr>
          <th>Năm sản xuất</th>
          <td>{item.date}</td>
        </tr>
        <tr>
          <th>Phân khối</th>
          <td>{item.cc}cc</td>
        </tr>
      </table>
    </div>
  )
}


