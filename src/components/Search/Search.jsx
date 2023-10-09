import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const Search = () => {
    const { key } = useParams();
    const [result, setResult] = useState();

    return (
        <div className='search'>
        
        </div>
    )
}

export default Search
