import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import './product.css'
import axios from 'axios';

const Product = ({type}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9090/api/products/details/type/${type}`)
      .then(res => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  return (
    <div className='product'>
      {data.map((item) => 
        <ProductItem item={item} />
      )}
    </div>
  )
}

export default Product
