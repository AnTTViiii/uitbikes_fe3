import React, { useEffect } from 'react'
import ShoppingCart from '../components/ShoppingCart/ShoppingCart'

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ShoppingCart />
  )
}

export default Cart
