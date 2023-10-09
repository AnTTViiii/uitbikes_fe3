import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProductData from '../components/Data/Product';
import ProductItem from '../components/Product/ProductItem';

const SearchResult = () => {
  const [keyword, setKeyWord] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setKeyWord(searchParams.get('s'));
  }, [location]);

  // ProductData.map((item) => (
  //   type !== '' ? (
  //     item.type_id === type ? data.push(item) : data
  //   ) : (data.push(item))
  // ))
  return (
    <div className='product'>
      {
        ProductData && ProductData
          .filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((item) => (
            <ProductItem item={item} />
          ))
      }
    </div>
  )
}

export default SearchResult
