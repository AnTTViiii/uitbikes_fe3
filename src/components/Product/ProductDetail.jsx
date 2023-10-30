import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductData from '../Data/Product'
import { getTypeName, getBrandName, dot3digits } from '../functions/functions'
import './product-detail.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];

  const path = location.pathname.split("/");
  let name = path[2].replace(/%20/g, ' ');

  const [data, setData] = useState([]); 
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/api/products/detail/names/" + name)
      .then((response) => {
        setData(response.data);
        setDetails(response.data.detail);
      });
  }, []);

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

  const [colorSelected, setColorSelected] = useState(0);

  const handlePurchased = () => {

  }

  const handleAddToCart = () => {

  }

  return (
    <div className='product-detail'>
      <div className="product-detail-img">
        {
          details.map((item, index) => index === colorSelected && (
            <img src={item.image} alt={data.name} />
          ))
        } 
      </div>
      <div className="product-detail-title">
        <h3>{data.name}</h3>
        {
          details.map((item, index) => index === colorSelected && (
            <p>{dot3digits(item.price)} đ</p>
          ))
        }
        <div className="product-color">
          {
            details.map((item, index) => (
              <div className={`color ${colorSelected === index ? ' active' : ''}`} 
                  onClick={(e) => {setColorSelected(index)}}>
                {item.color}
              </div>
            ))
          }
        </div>
        <div className="product-quantity">
          {
            details.map((item, index) => index === colorSelected && (
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
          <div className="buy-now" onClick={isAuthed ? handlePurchased : navigate("/signin")}>Mua ngay</div>
          <div className="add-to-cart" onClick={isAuthed ? handleAddToCart : navigate("/signin")}>Thêm vào giỏ</div>
        </div>
      </div>
      <div className="product-detail-description">
        <div className="product-detail-description-title">
          <div className={descriptionToggle === 0 ? "title active" : "title"} onClick={() => toggleTab(0)}>Mô tả sản phẩm</div>
          <div className={descriptionToggle === 1 ? "title active" : "title"} onClick={() => toggleTab(1)}>Thông số kỹ thuật</div>
        </div>
        <div className="product-detail-description-content">
          <Page item={data} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

export const ProductDescription = ({item}) => {
  return (
    <div className='product-description'>
        {item.describe}
    </div>
  )
}

export const ProductSpecification = ({item}) => {
  return (
    <div className='product-specification'>
      <table cellSpacing={0}>
        <tr>
          <th>Hãng xe</th>
          <td>{item.brand.name}</td>
        </tr>
        <tr>
          <th>Loại xe</th>
          <td>{item.type.name}</td>
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


