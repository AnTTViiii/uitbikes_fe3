import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductData from './ProductData'
import { getTypeName, getBrandName, dot3digits } from '../functions/functions'
import './product-detail.css'

const ProductDetail = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  let id = parseInt(path[2]);

  const [descriptionToggle,  setDescriptionToggle] = useState(0);
  const toggleTab = (index) => {
    setDescriptionToggle(index);
  };
  const Page = (descriptionToggle === 0) ? ProductDescription : ProductSpecification;

  let [count, setCount] = useState(1);

  function incrementCount(x) {
    count = count < x ? count + 1 : x;
    setCount(count);
  }

  function decrementCount() {
    count = count > 1 ? count - 1 : 1;
    setCount(count);
  }

  return (
    ProductData.map((i) => i.p_id === id && (
      <div className='product-detail'>
        <div className="product-detail-img">
          {
            i.detail.map((item, index) => index === 0 && (
              <img src={item.image} alt={i.name} />
            ))
          } 
        </div>
        <div className="product-detail-title">
          <h3>{i.name}</h3>
          {
            i.detail.map((item, index) => index === 0 && (
              <p>{dot3digits(item.price)} đ</p>
            ))
          }
          <div className="product-color">
            {
              i.detail.map((item) => (
                <div className='color'>{item.color}</div>
              ))
            }
          </div>
          <div className="product-quantity">
            {
              i.detail.map((item, index) => index === 0 && (
                <><p>Kho: {item.quantity}</p>
                <div className="counter">
                  <div onClick={decrementCount}>-</div>
                  <div>{count}</div>
                  <div onClick={() => {incrementCount(item.quantity)}}>+</div>
                </div></>
              ))
            }
          </div>
          <div className="shopping-button">
            <div className="buy-now">Mua ngay</div>
            <div className="add-to-cart">Thêm vào giỏ</div>
          </div>
        </div>
        <div className="product-detail-description">
          <div className="product-detail-description-title">
            <div className={descriptionToggle === 0 ? "title active" : "title"} onClick={() => toggleTab(0)}>Mô tả sản phẩm</div>
            <div className={descriptionToggle === 1 ? "title active" : "title"} onClick={() => toggleTab(1)}>Thông số kỹ thuật</div>
          </div>
          <div className="product-detail-description-content">
            <Page item={i} />
          </div>
        </div>
      </div>
    ))
  )
}

export default ProductDetail

export const ProductDescription = ({item}) => {
  return (
    <div className='product-description'>
      {/* <pre> */}
        {item.describe}
      {/* </pre> */}
    </div>
  )
}

export const ProductSpecification = ({item}) => {
    return (
      <div className='product-specification'>
        <table cellSpacing={0}>
          <tr>
            <th>Hãng xe</th>
            <td>{getBrandName(item.brand_id)}</td>
          </tr>
          <tr>
            <th>Loại xe</th>
            <td>{getTypeName(item.type_id)}</td>
          </tr>
          <tr>
            <th>Năm sản xuất</th>
            <td>{item.date}</td>
          </tr>
          <tr>
            <th>Phân khối</th>
            <td>{item.cc}cc</td>
          </tr>
        </table>
    </div>
    )
}


