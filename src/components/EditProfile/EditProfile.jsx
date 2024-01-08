import React, { useRef, useState } from 'react'
import { Alert, Button } from '@mui/material'
import './edit-profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AccountCircle, ErrorRounded, CheckRounded } from '@mui/icons-material'

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

  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  // const [showAlertSuccess, setShowAlertSuccess] = useState(success !== null ? true : false);
  // const setAlertError = (error) => {
  //     setError(error);
  //     setShowAlert(true);
  // };

  const [notify, setNotify] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [position, setPosition] = useState(null);

  const setAlertError = (error) => {
    setNotify(error);
    setShowAlert(true);
  };

  const setNofification = (success) => {
      setNotify(success);
      setShowNotify(true);
  };

  const handleCloseNotify = () => {
    setShowAlert(false);
    setShowNotify(false);
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
        setShowAlert(false);
        setPosition(0);
        setNofification("File hình ảnh đã được tải lên.")
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
        setShowAlert(false)
        setNofification("Ảnh đại diện đã được cập nhật!")
        setTimeout(() => { handleCloseNotify() }, 2000)
      })
      .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
  }

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const dobRef = useRef();
  const idNumberRef = useRef();
  const [gender, setGender] = useState(user.customer.gender);
  const handleChangeGender = e => {
    setGender(e.target.value);
  }

  const handleUpdate = async() => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const dob = new Date(dobRef.current.value);
    const idNumber = idNumberRef.current.value;
    const cus = user.customer;

    const customer = {
      "id": cus.id,
      "name": name !== '' ? name : cus.name,
      "address": address !== '' ? address : cus.address,
      "phone": phone !== '' ? phone : cus.phone,
      "date": dob.toString() !== 'Invalid Date' ? dob : new Date(cus.date),
      "registerDate": cus.registerDate,
      "balance": cus.balance,
      "gender": gender,
      "idNumber": idNumber !== '' ? idNumber : cus.idNumber
    }

    axios.put(`http://localhost:9090/api/customers/${user.username}`, customer)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        setShowAlert(false)
        setPosition(1)
        setNofification("Thông tin đã được cập nhật!")
        setTimeout(() => { handleCloseNotify() }, 2000)
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
        <Button variant="contained" component="label" className='themeColor noneTextTransform'>
          Thay đổi avatar
          <input accept="image/*" onChange={(e) => {onImageChange(e); handleUploadImg(e)}} 
            style={{ display: 'none' }} type="file" />
        </Button>

        {(showAlert || showNotify) && position === 0 &&
          <Alert icon={showAlert ? <ErrorRounded /> : <CheckRounded />} className='alert'
            severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
            { notify }
          </Alert>
        }

        <Button variant="contained" style={{ display: 'none' }} onClick={handleUpdateAvatar}
          className='themeColor noneTextTransform' id='saveAvatarBtn'>Lưu</Button>
      </div>
      <div className="user-info">
        <p>Tên đăng nhập: <span>{user.username}</span></p>
        <p>Email: <span>{user.email}</span></p>
        <p>Tên khách hàng: <input ref={nameRef} type='text' defaultValue={user.customer.name} /></p>
        <p>Giới tính: 
          <div className='gender-radio-group'> 
            <input type='radio' name='gender' value={0} onChange={(e) => handleChangeGender(e)} defaultChecked={gender === 0 ? true : false}/>Nam
            <input type='radio' name='gender' value={1} onChange={(e) => handleChangeGender(e)} defaultChecked={gender === 1 ? true : false} />Nữ
            <input type='radio' name='gender' value={2} onChange={(e) => handleChangeGender(e)} defaultChecked={gender === 2 || gender == null ? true : false}/>Khác 
          </div>
        </p>
        <p>Ngày sinh: 
          <input ref={dobRef} type='date' min="1930-01-01" max="2010-12-31" 
            defaultValue={user.customer.date != null ? (user.customer.date).slice(0, 10) : user.customer.date} />
        </p>
        <p>SĐT: <input ref={phoneRef} type='text' defaultValue={user.customer.phone} /></p> 
        <p>Địa chỉ: <input ref={addressRef} type='text' defaultValue={user.customer.address} /></p>
        <p>CCCD: <input ref={idNumberRef} type='text' defaultValue={user.customer.idNumber} /></p>
        <Button variant="contained" component="label" onClick={handleUpdate}
          className='themeColor noneTextTransform'>
          Cập nhật
        </Button>

        {(showAlert || showNotify) && position === 1 &&
        <Alert className='alert' icon={showAlert ? <ErrorRounded /> : <CheckRounded />}
          severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
          { notify }
        </Alert>
      }
      </div>
    </div>
    </>
  )
}

export default EditProfile
