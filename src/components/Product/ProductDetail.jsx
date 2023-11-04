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
  const [defProduct, setDefProduct] = useState([]);
  const [productId, setProductId] = useState(path[3]);
  const [invoiceId, setInvoiceId] = useState();

  useEffect(() => {
    axios.get("http://localhost:9090/api/products/detail/names/" + name)
      .then((response) => {
        setData(response.data);
        setDetails(response.data.detail);
      });
    axios.get(`http://localhost:9090/api/products/${productId}`)
      .then((res) => {
        setDefProduct(res.data)
      })
  }, [name, data, details, productId]);

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

  const [openConfirmPurchasedDialog, setOpenConfirmPurchasedDialog] = useState(false);
  const handleCloseConfirmPurchasedDialog = () => setOpenConfirmPurchasedDialog(false);

  const handlePurchased = async() => {
    let total = count * defProduct.price;
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
            customer: cus,
            details: [
              {
                product: defProduct,
                quantity: count
              }
            ]
          }
          await axios.post(`http://localhost:9090/api/invoices/create`, order)
            .then((res) => {
                setNofification('Đơn hàng đã được tạo.');
                handleCloseConfirmPurchasedDialog();
                axios.get(`http://localhost:9090/api/accounts/${user.username}`)
                .then((res) => {
                  localStorage.setItem('user', JSON.stringify(res.data))
                });
                setTimeout(handleClose, 2500);
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
    } else navigate('/signin')
  }
  
  return (
    <div className='product-detail'>
      <div className="product-detail-img">
        <img src={defProduct.image} alt={data.name} />
      </div>
      <div className="product-detail-title">
        <h3>{data.name}</h3>
        {
          details.map((item) => item.id === defProduct.id && (
            <p>{dot3digits(item.price)} đ</p>
          ))
        }
        <div className="product-color">
          {
            details.map((item) => (
              <div className={`color ${item.id === defProduct.id ? ' active' : ''}`} 
                  onClick={(e) => {setProductId(item.id)}}>
                {item.color}
              </div>
            ))
          }
        </div>
        <div className="product-quantity">
          <>
            <p>Kho: {defProduct.quantity}</p>
            <div className="counter">
              <div onClick={decrementCount}>-</div>
              <div>{count}</div>
              <div onClick={() => {incrementCount(defProduct.quantity)}}>+</div>
            </div>
          </>
        </div>
        <div className="shopping-button">
          <Button variant='contained' className="themeColor noneTextTransform" onClick={() => setOpenConfirmPurchasedDialog(true)}>Mua ngay</Button>
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
            <Button className="themeColor noneTextTransform" onClick={handleNavigate}>{actionMsg}</Button>
            <Button className="bgColor noneTextTransform" onClick={handleCloseRemminderDialog}>Để sau</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openConfirmPurchasedDialog} TransitionComponent={Transition}
          keepMounted onClose={handleCloseConfirmPurchasedDialog}
        >
          <DialogTitle>Bạn có chắc chắn muốn đặt hàng?</DialogTitle>
          <DialogActions>
            <Button className="themeColor noneTextTransform" onClick={handlePurchased}>Chắc chắn</Button>
            <Button className="bgColor noneTextTransform" onClick={handleCloseConfirmPurchasedDialog}>Hủy</Button>
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


