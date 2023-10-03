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
        <p>Tên khách hàng: <input type='text' defaultValue={Customer.name} /></p>
        <p>Giới tính: 
          <input type='radio' name="gender" value={1} defaultChecked={Customer.gender === 1 ? true : false} />Nữ 
          <input type='radio' name="gender" value={0} defaultChecked={Customer.gender === 0 ? true : false}/>Nam 
        </p>
        <p>Ngày sinh: <input type='date' defaultValue={Customer.dob} /></p>
        <p>SĐT: <input type='text' defaultValue={Customer.phone} /></p> 
        <p>Địa chỉ: <input type='text' defaultValue={Customer.address} /></p>
        <Button variant="contained" component="label" className='edit-profile-btn'>
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default EditProfile
