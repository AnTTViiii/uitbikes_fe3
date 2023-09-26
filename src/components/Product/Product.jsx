import React from 'react'
import ProductData from './ProductData';
import ProductItem from './ProductItem';
import './product.css'

const Product = ({type}) => {
  const data = [];
  ProductData.map((item) => (
    type !== '' ? (
      item.type_id === type ? data.push(item) : data
    ) : (data.push(item))
  ))
  return (
    <div className='product'>
      {data.map((item) => 
        <ProductItem item={item} />
      )}
    </div>
  )
}

export default Product
