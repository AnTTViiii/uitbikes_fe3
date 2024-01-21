import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './invoice-to-review.css'
import { Button, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import InsertReview from './InsertReview';

const InvoiceToReview = () => {
    const { isAuthed } = useSelector((state) => state.auth)
    const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : []

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9090/api/invoices/unreviewed/customer/${user.customer.id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [data, user.customer.id])

    const [selectedItem, setSelectedItem] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const closePopup = () => {
        setOpenPopup(false)
    }

    return (
        <div className='unreviewed-list'>
        {data && data.length ? data.map((item) => (
            <div className="unreviewed">
                <div className='unreviewed-header'>Hoá đơn <span>#{item.invoiceId}</span> đặt ngày <span>{new Date(item.purchasedDate).toLocaleString()}</span></div>
                <div className='unreviewed-body'>
                    <div className="unreviewed-left">
                        <img src={item.pImg} alt={item.pName} />
                        <div className="unreviewed-detail">
                            <p><Link to={`/product/${item.pName}/${item.pId}`}>{item.pName}</Link></p>
                            <p>Màu: {item.pColor}</p>
                        </div>
                    </div>

                    <div className="unreviewed-right">
                        <Button variant='contained' onClick={() => {setSelectedItem(item); setOpenPopup(true)}}>Viết đánh giá</Button>
                    </div>
                </div>
            </div>
        )) : (
            <div className='empty-notice'><i>Không có đơn hàng nào cần đánh giá</i></div>
        )}

        <Dialog open={openPopup} onClose={closePopup}>
            <InsertReview item={selectedItem} />
        </Dialog>
        </div>
    )
}

export default InvoiceToReview
