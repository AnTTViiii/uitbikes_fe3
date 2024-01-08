import React, { useEffect, useState } from 'react'
import './search-filter.css'
import { dot3digits } from '../functions/functions';
import { Autocomplete, Button, Slider, TextField } from '@mui/material';
import { ClearRounded, TuneRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'


const SearchFilter = () => {
    const navigate = useNavigate();

    const [filterToggle, setFilterToggle] = useState(false);
    const handleFilterToggle = () => {
        setFilterToggle(!filterToggle)
    }
    const openFilter = () => {
        document.querySelector('.search-filter').style.display = 'flex'
    }

    const closeFilter = () => {
        document.querySelector('.search-filter').style.display = 'none'
    }

    const [price, setPrice] = useState(0);
    const [year, setYear] =  useState(0);
    const [cc, setCC] =  useState(0);
    const [type, setType] = useState(0);
    const [brand, setBrand] = useState(0);
    const [selectedColors, setSelectedColors] = useState([]);

    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [ccRange, setCCRange] =  useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    };

    const handleChangeYear = (event, newValue) => {
        setYear(newValue);
    };

    const handleChangeCC = (event, newValue) => {
        setCC(newValue);
    };

    useEffect(() => {
        axios.get('http://localhost:9090/api/brands')
            .then((res) => 
                setBrands(res.data)
            )
            .catch((err) => {console.log(err)})
        axios.get('http://localhost:9090/api/products/colors')
            .then((res) => {
                setColors(res.data)
            })
            .catch((err) => {console.log(err)})
        axios.get('http://localhost:9090/api/products/cc')
            .then((res) => {
                setCCRange(res.data)
                setCC(res.data[1])
            })
            .catch((err) => {console.log(err)})
        axios.get('http://localhost:9090/api/products/price')
            .then((res) => {
                setPriceRange(res.data)
                setPrice(res.data[1])
            })
            .catch((err) => {console.log(err)})
        axios.get('http://localhost:9090/api/products/date')
            .then((res) => {
                setYearRange(res.data)
                setYear(res.data[1])
            })
            .catch((err) => {console.log(err)})
    }, [])
    //data, colors, ccRange, yearRange, priceRange

    const handleSearch = (e) => {
        e.preventDefault();
        const filter = {
            type: type,
            brand: brand,
            cc: cc,
            price: price,
            year: year,
            colors: selectedColors
        }
        const initParams = (params) => {
            let param = '';
            for (const [key, value] of Object.entries(params)) {
                param += `&${key}=${value}`;
            }
            return param;
        }
        const query = queryString.stringify({ f: initParams(filter)} )
        navigate(`/search?${query}`);
    }
    
    return (
        <div className="search-result-left">
            <IconButton className='filter-toggle-icon' onClick={handleFilterToggle}>
            {
                filterToggle === false 
                ? <TuneRounded className='open-filter' onClick={openFilter} /> 
                : <ClearRounded className='close-filter' onClick={closeFilter} />
            }
            </IconButton>

            <div className='search-filter'>
                <h3>Bộ lọc tìm kiếm</h3>
                <div className="filter-type">
                    <p>Loại xe</p>
                    <div className="type-option">
                        <div className={type === 0 ? 'active' : ''} onClick={() => setType(0)}>Tất cả</div>
                        <div className={type === 1 ? 'active' : ''} onClick={() => setType(1)}>Xe số</div>
                        <div className={type === 2 ? 'active' : ''} onClick={() => setType(2)}>Xe tay ga</div>
                        <div className={type === 3 ? 'active' : ''} onClick={() => setType(3)}>Xe phân khối lớn</div>
                    </div>
                </div>

                <div className="filter-brand">
                    <p>Hãng xe</p>
                    <div className='brand-option'>
                        <div className={brand === 0 ? 'active' : ''} onClick={() => setBrand(0)}>Tất cả</div>
                        {brands.map((item) => (
                            <div className={brand === item.id ? 'active' : ''} onClick={() => setBrand(item.id)}>{item.name}</div>
                        ))}
                    </div>
                </div>

                <div className="filter-price-year-cc">
                    <p>Khoảng giá</p>

                    <div className="price-range">
                        <label>{price !== 0 ? dot3digits(price) : dot3digits(priceRange[0] !== undefined ? priceRange[0] : price)} đ</label>
                        <Slider
                            onChange={handleChangePrice}
                            min={priceRange[0]} max={priceRange[1]}
                            value={priceRange[1]}
                            step={1000000} color='error'
                        />
                    </div>

                    <p>Năm sản xuất</p>
                    <div className="year-range">
                        <label>{year !== 0 ? year : yearRange[0]}</label>
                        <Slider
                            onChange={handleChangeYear}
                            min={yearRange[0]} max={yearRange[1]}
                            value={yearRange[1]}
                            step={1} color='error'
                        />
                    </div>

                    <p>Phân khối</p>
                    <div className="cc-range">
                        <label>{cc !== 0 ? cc : ccRange[0]} cc</label>
                        <Slider
                            onChange={handleChangeCC}
                            min={ccRange[0]} max={ccRange[1]}
                            value={ccRange[1]}
                            step={1} color='error'
                        />
                    </div>
                </div>

                <div className="filter-colors">
                    <p>Màu sắc</p>
                    <Autocomplete multiple className="colors-option" size='small'
                        options={colors} getOptionLabel={(option) => option}
                        onChange={(e, c)=>setSelectedColors(c)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Chọn màu sắc ..." />
                        )}
                    />
                </div>

                <Button className="filter-submit" variant='contained' onClick={handleSearch}>Lọc sản phẩm</Button>
            </div>
        </div>
    )
}

export default SearchFilter
