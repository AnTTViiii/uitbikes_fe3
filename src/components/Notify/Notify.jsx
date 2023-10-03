import React from 'react'
import Cart from '../Data/Cart'
import { Invoice } from '../Data/Customer'

const Notify = () => {
  return (
    <div>
      {Invoice.map((item) => item.status === 2 && (
        <NotifyItem item={item} />
      ))}
    </div>
  )
}

export default Notify

export const NotifyItem = ({item}) => {
    return (
        <div>
            {
                item.details.map((product, index) => index === 0 &&
                    Cart.map((cart) => cart.product.p_id === product.p_id && (
                        <img src={cart.product.image} alt={product.invoice_id} />
                    ))
                )
            }
            <p>Hóa đơn #{item.invoice_id} đã được giao.</p>
        </div>
    )
  }