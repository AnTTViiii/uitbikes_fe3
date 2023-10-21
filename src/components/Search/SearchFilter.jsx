import React, { useState } from 'react'
import './search-filter.css'
import { dot3digits } from '../functions/functions';
import ProductData from '../Data/Product';
import { Autocomplete, Button, TextField } from '@mui/material';

const SearchFilter = () => {
    const brands = ['Honda', 'Suzuki', 'Yamaha', 'SYM'];
    const [price, setPrice] = useState(449000000);
    const [year, setYear] =  useState(2022);
    const [cc, setCC] =  useState(1833);
    const [type, setType] = useState(0);
    const [brand, setBrand] = useState(0);

    const colors = [];
    ProductData.map((product)=> (
        product.detail.map((item) => (
            !colors.find(color => color === item.color ) 
            ? colors.push(item.color)
            : colors
        ))
    ))
    
    return (
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
                    {brands.map((item, index) => (
                        <div className={brand === index + 1 ? 'active' : ''} onClick={() => setBrand(index + 1)}>{item}</div>
                    ))}
                </div>
            </div>

            <div className="filter-price-year-cc">
                <p>Khoảng giá</p>
                <div className="price-range">
                    <output>{price == 16000000 ? '16.000.000' : '16.000.000 - ' + dot3digits(price)} đ</output>
                    <input type="range" min="16000000" max="449000000" defaultValue="449000000" step="1000000" 
                        className='slider' onChange={(e) => setPrice(e.target.value)} />
                </div>

                <p>Năm sản xuất</p>
                <div className="year-range">
                    <output>{year == 2019 ? 2019 : '2019 - ' + year }</output>
                    <input type="range" min="2019" max="2022" defaultValue="2022" 
                        className='slider' onChange={(e) => setYear(e.target.value)} />
                </div>

                <p>Phân khối</p>
                <div className="cc-range">
                    <output>{cc == 50 ? 50 : '50 - ' + cc} cc</output>
                    <input type="range" min="50" max="1833" step="25" defaultValue="1833" 
                        className='slider' onChange={(e) => setCC(e.target.value)} />
                </div>
            </div>

            <div className="filter-colors">
                <p>Màu sắc</p>
                <Autocomplete multiple className="colors-option" size='small'
                    options={colors} getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn màu sắc ..." />
                    )}
                />
            </div>

            <Button className="filter-submit" variant='contained'>Lọc sản phẩm</Button>
        </div>
    )
}

export default SearchFilter
