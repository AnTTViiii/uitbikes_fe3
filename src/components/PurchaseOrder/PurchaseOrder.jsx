import React, { useState } from 'react'
import { Invoice } from '../Data/Customer'
import Cart from '../Data/Cart'
import { getInvoiceStatusName } from '../functions/functions'

const PurchaseOrder = () => {
  const orderStatus = [
    {
      id: 0,
      name: 'Tất cả'
    },
    {
      id: 1,
      name: 'Chờ xác nhận'
    },
    {
      id: 2,
      name: 'Đang giao'
    },
    {
      id: 3,
      name: 'Đã giao'
    },
    {
      id: 4,
      name: 'Đã hủy'
    }
  ]
  const [tab, setTab] = useState(0);
  const products = [];
  Invoice.map((item) => (
    tab === 0 ? products.push(item) : (item.status === tab - 1 ? products.push(item) : '')
  ))
  return (
    <div className='purchase-order'>
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
        {item.details.map((item, index) => index < 3 && (
          Cart.map((product) => product.product.p_id === item.p_id && (
            <><img src={product.product.image} alt={product.product.name} />
            <div>
              <p>{product.product.name}</p>
              <p>{product.product.color}</p>
              <p>x{product.quantity}</p>
            </div>
            <div>{product.product.price}</div></>
          ))
        ))}
      </div>
    </div>
  )
}
