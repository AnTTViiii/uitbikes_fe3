import React, { useState } from 'react'
import Customer, { Account } from '../Data/Customer'
import { Alert, Button } from '@mui/material'
import './edit-profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Check, Error, AccountCircle } from '@mui/icons-material'

const EditProfile = () => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : [];

  const [image, setImage] = useState(user.avatar);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const [imgUrl, setImgUrl] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(success !== null ? true : false);
  const setAlertError = (error) => {
      setError(error);
      setShowAlert(true);
  };

  const handleUploadImg = (e) => {
    var file = e.target.files[0];
    var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
    console.log("uploading...");
    setAlertError("Đang tải lên hình ảnh...");
    
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "uitbikes_image");

    axios.post(POST_URL, formdata).then((res)=>{
        console.log(res.data); 
        setImgUrl(res.data.url);
        setError(null);
        setShowAlert(false); 
        setSuccess("File hình ảnh đã được tải lên.")
        setShowAlertSuccess(true);
        document.getElementById('saveAvatarBtn').style.display = "block";
    });
  }

  const handleUpdateAvatar = async() => {
    const avt = { "avatar": imgUrl }

    axios.put(`http://localhost:9090/api/accounts/${user.username}/avatar`, avt)
      .then((res) => {
        axios.get(`http://localhost:9090/api/accounts/${user.username}`)
          .then((res1) => {localStorage.setItem('user', JSON.stringify(res1.data))})
          .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
        document.getElementById('saveAvatarBtn').style.display = "none";
        setSuccess("Ảnh đại diện đã được cập nhật!")
        setShowAlertSuccess(true);
        setTimeout(() => {
          setSuccess(null)
          setShowAlertSuccess(false)
        }, 3000)
      })
      .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
  }

  const handleUpdate = async() => {
    const customer = { 
      "avatar": imgUrl 
    }

    axios.put(`http://localhost:9090/api/customers/${user.username}`, customer)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        setSuccess("Thông tin đã được cập nhật!")
        setShowAlertSuccess(true);
        setTimeout(() => {
          setSuccess(null)
          setShowAlertSuccess(false)
        }, 3000)
      })
      .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
  }

  return (
    <>
    <h3>Chỉnh sửa hồ sơ</h3>
    <div className='edit-profile'>
      <div className="edit-profile-left">
        { image != null
          ? <img src={image} alt={user.username} className="user-avatar" />
          : <AccountCircle className="user-avatar icon" />
        }
        <Button variant="contained" component="label" className='imagePicker noneTextTransform'>
          Thay đổi avatar
          <input accept="image/*" onChange={(e) => {onImageChange(e); handleUploadImg(e)}} 
            style={{ display: 'none' }} type="file" />
        </Button>

        {showAlert && 
          <Alert icon={<Error fontSize="inherit" />}
            severity="warning" sx={{ margin: "20px 0" }}
          >
            {error}
          </Alert>
        }
        {showAlertSuccess && 
          <Alert icon={<Check fontSize="inherit" />}
            severity="success" sx={{ margin: "20px 0" }}
          >
            {success}
          </Alert>
        }

        <Button variant="contained" style={{ display: 'none' }} onClick={handleUpdateAvatar}
          className='bgMainColor noneTextTransform' id='saveAvatarBtn'>Lưu</Button>
      </div>
      <div className="user-info">
        <p>Tên đăng nhập: <span>{user.username}</span></p>
        <p>Email: <span>{user.email}</span></p>
        <p>Tên khách hàng: <input type='text' defaultValue={Customer.name} /></p>
        <p>Giới tính: 
          <div>
            <input type='radio' name="gender" value={1} defaultChecked={user.customer.gender === 1 ? true : false} />Nữ 
            <input type='radio' name="gender" value={0} defaultChecked={user.customer.gender === 0 ? true : false}/>Nam
            <input type='radio' name="gender" value={2} defaultChecked={user.customer.gender === 2 || user.customer.gender == null ? true : false}/>Khác 
          </div>
        </p>
        <p>Ngày sinh: <input type='date' min="1930-01-01" max="2010-12-31" defaultValue={user.customer.date != null ? (user.customer.date).slice(0, 10) : user.customer.date} /></p>
        <p>SĐT: <input type='text' defaultValue={user.customer.phone} /></p> 
        <p>Địa chỉ: <input type='text' defaultValue={user.customer.address} /></p>
        <p>CCCD: <input type='text' defaultValue={user.customer.idNumber} /></p>
        <Button variant="contained" component="label" onClick={handleUpdate}
          className='edit-profile-btn noneTextTransform'>
          Cập nhật
        </Button>
      </div>
    </div>
    </>
  )
}

export default EditProfile
