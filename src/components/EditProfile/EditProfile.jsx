import React, { useState } from 'react'
import Customer, { Account } from '../Data/Customer'
import { Button } from '@mui/material'

const EditProfile = () => {
  const [image, setImage] = useState(Account.avatar);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  return (
    <div className='edit-profile'>
      <div className="edit-profile-left">
        <img src={image} alt={Account.username} className="user-avatar" />
        <Button variant="contained" component="label" className='imagePicker'>
          Thay đổi avatar
          <input accept="image/*" onChange={onImageChange} 
            style={{ display: 'none' }} type="file" />
        </Button>
      </div>
      <div className="user-info">
        <p>Tên đăng nhập: <span>{Account.username}</span></p>
        <p>Email: <span>{Account.email}</span></p>
        <p>Tên khách hàng: <span>{Customer.name}</span></p>
        <p>Giới tính: <span>{Customer.gender}</span></p>
        <p>Ngày sinh: <span>{Customer.dob}</span></p>
        <p>SĐT: <span>{Customer.phone}</span></p> 
        <p>Địa chỉ: <span>{Customer.address}</span></p>
      </div>
    </div>
  )
}

export default EditProfile