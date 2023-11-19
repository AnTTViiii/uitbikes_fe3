import React, { useEffect, useState } from 'react'
import { Transition, dot3digits, getInvoiceStatusName } from '../functions/functions'
import './purchase-order.css'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import axios from 'axios'
const PurchaseOrder = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const orderStatus = [
    { name: 'Tất cả' },
    { name: 'Chờ xác nhận' },
    { name: 'Đang giao' },
    { name: 'Đã giao' },
    { name: 'Đã hủy' }
  ]

  const [tab, setTab] = useState(-1);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9090/api/invoices/customer/${user.customer.id}/status/${tab}`)
      .then((res) => setData(res.data.reverse()))
      .catch((err) => console.log(err))
  }, [tab, data])

  return (
    <div className='purchase-order'>
      <h3>Đơn mua</h3>
      <div className="order-status-tab">
        {orderStatus.map((item, index) => (
          <div className={tab === index - 1 ? 'active' : ''} onClick={()=>setTab(index - 1)}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="order-list">
        {data.map((item) => (
          <OrderDetail item={item} />
        ))}
      </div>
    </div>
  )
}

export default PurchaseOrder

const OrderDetail = ({item}) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const handleCancelOrder = async() => {
    await axios.put(`http://localhost:9090/api/invoices/${item.id}/status/3`)
      .then(() => {
        handleCloseCancelDialog()
        axios.get(`http://localhost:9090/api/accounts/${user.username}`)
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
          })
      })
  }

  useEffect(() => {}, [item])

  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const handleCloseCancelDialog = () => setOpenCancelDialog(false);

  return (
    <div>
      <div className="order-status">
        <p>Hóa đơn #{item.id}</p>
        <p>{getInvoiceStatusName(item.status)}</p>
      </div>
      <div className="order-products">
        {item.details.map((detail) => (
          <div className='order-product'>
            <img src={detail.product.image} alt={detail.product.name} />
            <div>
              <div>
                <p>{detail.product.name}</p>
                <p>Màu: {detail.product.color}</p>
                <p>x{detail.quantity}</p>
              </div>
              <div className='order-product-price'>{dot3digits(detail.product.price)} đ</div>
            </div>
          </div>
        ))}
        <table>
          <tr>
            <td>Phí vận chuyển</td>
            <td className='shipping-fee'>250.000 đ</td>
          </tr>
          <tr>
            <td>Thành tiền</td>
            <td className='order-total'>{dot3digits(item.total)} đ</td>
          </tr>
          {item.status === 0 ? (
            <tr>
              <td></td>
              <td><Button className='order-cancel-btn' onClick={() => setOpenCancelDialog(true)}>Hủy</Button></td>
            </tr>
          ) : ''}
        </table>
      </div>

      <Dialog open={openCancelDialog} TransitionComponent={Transition}
        keepMounted onClose={handleCloseCancelDialog}
      >
        <DialogTitle>Bạn có chắc chắn muốn hủy đơn hàng?</DialogTitle>
        <DialogActions>
          <Button className="themeColor noneTextTransform" onClick={() => handleCancelOrder()}>Chắc chắn</Button>
          <Button className="bgColor noneTextTransform" onClick={handleCloseCancelDialog}>Không</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
