import React, { useState } from 'react'
import { Invoice } from '../Data/Customer'
import Cart from '../Data/Cart'
import { dot3digits, getInvoiceStatusName } from '../functions/functions'
import './purchase-order.css'
import { Button } from '@mui/material'
const PurchaseOrder = () => {
  const orderStatus = [
    { name: 'Tất cả' },
    { name: 'Chờ xác nhận' },
    { name: 'Đang giao' },
    { name: 'Đã giao' },
    { name: 'Đã hủy' }
  ]
  const [tab, setTab] = useState(0);
  const products = [];
  Invoice.map((item) => (
    tab === 0 ? products.push(item) : (item.status === tab - 1 ? products.push(item) : '')
  ))
  return (
    <div className='purchase-order'>
      <h3>Đơn mua</h3>
      <div className="order-status-tab">
        {orderStatus.map((item, index) => (
          <div className={tab === index ? 'active' : ''} onClick={()=>setTab(index)}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="order-list">
        {products.map((item) => (
          <OrderDetail item={item} />
        ))}
      </div>
    </div>
  )
}

export default PurchaseOrder

const OrderDetail = ({item}) => {
  return (
    <div>
      <div className="order-status">
        <p>Hóa đơn #{item.invoice_id}</p>
        <p>{getInvoiceStatusName(item.status)}</p>
      </div>
      <div className="order-products">
        {item.details.map((item) => (
          Cart.map((product) => product.product.p_id === item.p_id && (
            <div className='order-product'>
              <img src={product.product.image} alt={product.product.name} />
              <div>
                <div>
                  <p>{product.product.name}</p>
                  <p>Màu: {product.product.color}</p>
                  <p>x{product.quantity}</p>
                </div>
                <div className='order-product-price'>{dot3digits(product.product.price)} đ</div>
              </div>
            </div>
          ))
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
              <td><Button className='order-cancel-btn'>Hủy</Button></td>
            </tr>
          ) : ''}
        </table>
      </div>
    </div>
  )
}
