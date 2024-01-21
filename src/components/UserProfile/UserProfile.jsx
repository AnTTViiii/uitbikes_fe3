import React, { useEffect, useState } from 'react'
import './user-profile.css'
import { useSelector } from 'react-redux'
import { getGender } from '../functions/functions';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';

const UserProfile = () => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : [];

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:9090/api/accounts/${user.username}`)
      .then((res) => {
        setData(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
  }, [user.username, data])

  console.log(data)
  return (
    <>
    <h3>Hồ sơ</h3>
    <div className='user-profile'>
      <div className="user-profile-left">
        {user.avatar != null
          ? <img src={data.avatar} alt={data.username} className="user-avatar" />
          : <AccountCircle className="user-avatar icon" />
        }
        <p>Đã tham gia: {new Date(data.customer?.registerDate).toLocaleString()}</p>
      </div>
      <div className="user-info">
        <p>Tên đăng nhập: <span>{data.username}</span></p>
        <p>Email: <span>{data.email}</span></p>
        <p>Tên khách hàng: <span>{data.customer?.name}</span></p>
        <p>Giới tính: <span>{getGender(data.customer?.gender)}</span></p>
        <p>Ngày sinh: <span>{data.customer?.date != null ? new Date(data.customer?.date).toLocaleDateString() : ''}</span></p>
        <p>SĐT: <span>{data.customer?.phone}</span></p> 
        <p>Địa chỉ: <span>{data.customer?.address}</span></p>
        <p>CCCD: <span>{data.customer?.idNumber}</span></p>
      </div>
    </div>
    </>
  )
}

export default UserProfile
