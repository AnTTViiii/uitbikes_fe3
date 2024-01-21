import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './reviews.css'
import { Link } from 'react-router-dom'
import { Dialog, Rating } from '@mui/material'
import UpdateReview from './UpdateReview'

const Reviews = () => {
    const { isAuthed } = useSelector((state) => state.auth)
    const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : []

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9090/api/reviews/customer/${user.customer.id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [data, user.customer.id])

    const [selectedItem, setSelectedItem] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const closePopup = () => {
        setOpenPopup(false)
        setSelectedItem([])
    }

    return (
        <div className='review-history-list'>
        {data && data.length ? data.map((item) => (
            <div className="review-history">
                <div className='review-history-header'>
                    <p>Đánh giá ngày <span>{new Date(item.timestamp).toLocaleString()}</span></p>
                    <div onClick={() => {setSelectedItem(item); setOpenPopup(true)}}>Sửa đánh giá</div>
                </div>
                <div className='review-history-body'>
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="review-history-detail">
                        <p><Link to={`/product/${item.product.name}/${item.product.id}`}>{item.product.name}</Link></p>
                        <p>Màu: {item.product.color}</p>
                        
                        <div className="review-history-content">
                            <div className='review-history-rating'>
                                <Rating value={item.rate} readOnly />
                            </div>
                            <div className="review-history-text">{item.text}</div>
                            <div className="review-history-imgs">
                                {item.images.map((image) => (
                                    <img src={image.image} alt='review-img' />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )) : (
            <div className='empty-notice'><i>Không có đánh giá nào.</i></div>
        )}

        <Dialog open={openPopup} onClose={closePopup} keepMounted>
            <UpdateReview item={selectedItem} />
        </Dialog>
        </div>
    )
}

export default Reviews
