import React, { useEffect, useState } from 'react'
import { NotificationsActive } from '@mui/icons-material'
import './notify.css'
import { getInvoiceStatusNotify } from '../functions/functions'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Notify = () => {
  const [data, setData] = useState([]);

  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];
  
  useEffect(() => {
    axios.get(`http://localhost:9090/api/invoices/customer/${user.customer.id}/status/-1`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);
  console.log(data)

  return (
    <div className='notify'>
      <h2><NotificationsActive />Thông báo</h2>
      {
        data === undefined || data.length > 0 ? (
          data.map((item) => item.status > 0 && (
            <NotifyItem item={item} />
          ))
        ) : (
          <div><i>Không có thông báo mới!</i></div>
        )
      }
    </div>
  )
}

export default Notify

export const NotifyItem = ({item}) => {
  return (
    <div className='notify-item'>
      {
        item.details.map((detail, index) => index === 0 && (
            <img src={detail.product.image} alt={`Hóa đơn ${item.id}`} />
        ))
      }
      <p>Đơn hàng <span>#{item.id}</span> {getInvoiceStatusNotify(item.status)}.</p>
    </div>
  )
}