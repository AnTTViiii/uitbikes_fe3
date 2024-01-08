import React, { useEffect } from 'react'
import SearchFilter from '../components/Search/SearchFilter';
import Search from '../components/Search/Search';

const SearchResult = () => {  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <div className='search-result'>
      // <SearchFilter />
      <Search />
    // </div>
  )
}

export default SearchResult
