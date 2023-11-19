import React from 'react'
import ProductItem from '../Product/ProductItem'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import SearchFilter from './SearchFilter'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Search = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.has('s') && !searchParams.has('f')) navigate('/')
        else if (searchParams.has('s')) {
            axios.get(`http://localhost:9090/api/products/name/${searchParams.get('s')}`)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => console.log(err))
        } else if (searchParams.get('f') === '' || !searchParams.get('f').includes('&')) {
            axios.get(`http://localhost:9090/api/products/name/${searchParams.get('f')}`)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => console.log(err))
        } else {
            const params = searchParams.get('f').split("&")

            const filter = {
                "rangePrice":[0, params[4].split("=")[1]],
                "rangeCc":[0, params[3].split("=")[1]],
                "rangeDateManu":[0, params[5].split("=")[1]],
                "typeId": params[1].split("=")[1] === "0" ? null: params[1].split("=")[1],
                "brandId": params[2].split("=")[1] === "0" ? null: params[2].split("=")[1],
                "colorArray": params[6].split("=")[1] === '' ? [] : (params[6].split("=")[1].length === 0 ? params[6].split("=")[1].split() : params[6].split("=")[1].split(","))
            }

            console.log(filter)

            axios.post(`http://localhost:9090/api/products/search`, filter)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
        }
    }, [data]);

    const navigate = useNavigate();
    const handleRemoveFilter = (e) => {
        e.preventDefault();
        const query = queryString.stringify({ s: '' });
        navigate(`/search?${query}`);
    }
    return (
        <div className="search-result">
            <SearchFilter />
            {
                data.length > 0 ? (
                    <div className='product'>
                        {
                            data.map((item) => (
                                <ProductItem item={item} />
                            ))
                        }
                    </div>
                ) : (
                    <div className='result-not-found'>
                        <i>Rất tiếc! Không tìm thấy sản phẩm phù hợp.</i>
                        <Button variant='contained' className='themeColor noneTextTransform' onClick={handleRemoveFilter}>Xóa bộ lọc</Button>
                    </div>
                )
            }
        </div>
    )
}

export default Search
