import React from 'react'
import { ShoppingCartRounded } from '@mui/icons-material';
import './product-item.css'
import { IconButton } from '@mui/material';
import { dot3digits } from '../functions/functions'

const ProductItem = ({item}) => {
  return (
    <div className='product-item'>
      {item.detail.map((d,index)=> index === 0 && (
        <div className="product-item-inside">
          <div className="product-item-img">
            <img src={d.image} alt={item.name} />
          </div>
          <div className="product-item-txt">
            <h3>{item.name}</h3>
            <p>{dot3digits(d.price)} vnđ</p>
            <IconButton className='shopping-icon'>
              <ShoppingCartRounded />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductItem
