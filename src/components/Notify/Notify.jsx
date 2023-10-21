import React from 'react'
import Cart from '../Data/Cart'
import { Invoice } from '../Data/Customer'
import { NotificationsActive } from '@mui/icons-material'
import './notify.css'

const Notify = () => {
  return (
    <div className='notify'>
      <h2><NotificationsActive />Thông báo</h2>
      {Invoice.map((item) => item.status === 2 && (
        <NotifyItem item={item} />
      ))}
    </div>
  )
}

export default Notify

export const NotifyItem = ({item}) => {
  return (
    <div className='notify-item'>
      {
        item.details.map((product, index) => index === 0 &&
          Cart.map((cart) => cart.product.p_id === product.p_id && (
            <img src={cart.product.image} alt={product.invoice_id} />
          ))
        )
      }
      <p>Đơn hàng <span>#{item.invoice_id}</span> đã được giao.</p>
    </div>
  )
}