import React from 'react'
import './user-profile.css'
import { useSelector } from 'react-redux'
import { getGender } from '../functions/functions';
import { AccountCircle } from '@mui/icons-material';

const UserProfile = () => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : [];

  return (
    <>
    <h3>Hồ sơ</h3>
    <div className='user-profile'>
      <div className="user-profile-left">
        {user.avatar != null
          ? <img src={user.avatar} alt={user.username} className="user-avatar" />
          : <AccountCircle className="user-avatar icon" />
        }
        <p>Đã tham gia: {new Date(user.customer.registerDate).toLocaleString()}</p>
      </div>
      <div className="user-info">
        <p>Tên đăng nhập: <span>{user.username}</span></p>
        <p>Email: <span>{user.email}</span></p>
        <p>Tên khách hàng: <span>{user.customer.name}</span></p>
        <p>Giới tính: <span>{getGender(user.customer.gender)}</span></p>
        <p>Ngày sinh: <span>{user.customer.date != null ? new Date(user.customer.date).toLocaleDateString() : ''}</span></p>
        <p>SĐT: <span>{user.customer.phone}</span></p> 
        <p>Địa chỉ: <span>{user.customer.address}</span></p>
        <p>CCCD: <span>{user.customer.idNumber}</span></p>
      </div>
    </div>
    </>
  )
}

export default UserProfile
