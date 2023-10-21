import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProductData from '../components/Data/Product';
import ProductItem from '../components/Product/ProductItem';
import SearchFilter from '../components/Search/SearchFilter';
import { ClearRounded, TuneRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const SearchResult = () => {
  const [keyword, setKeyWord] = useState('');
  const location = useLocation();
  const [filterToggle, setFilterToggle] = useState(false);

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle)
  }



  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setKeyWord(searchParams.get('s'));
  }, [location]);

  const openFilter = () => {
    document.querySelector('.search-filter').style.display = 'flex'
  }

  const closeFilter = () => {
    document.querySelector('.search-filter').style.display = 'none'
  }

  return (
    <div className='search-result'>
      <div className="search-result-left">
        <IconButton className='filter-toggle-icon' onClick={handleFilterToggle}>
          {
            filterToggle === false 
            ? <TuneRounded className='open-filter' onClick={openFilter} /> 
            : <ClearRounded className='close-filter' onClick={closeFilter} />
            }
        </IconButton>
        <SearchFilter />
      </div>
      <div className='product'>
        {
          ProductData && ProductData
            .filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))
            .map((item) => (
              <ProductItem item={item} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchResult
