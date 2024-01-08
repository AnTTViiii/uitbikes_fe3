import { CheckRounded, ErrorRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useRef, useState } from 'react'
import './change-password.css'
import axios from 'axios';
const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const oldPassRef = useRef();
  const newPassRef = useRef();
  const confirmPassRef = useRef();

  const handleChangePassword = async() => {
    const oldPass = oldPassRef.current.value
    const newPass = newPassRef.current.value
    const confirmPass = confirmPassRef.current.value

    if (oldPass === '' || newPass === '' || confirmPass ==='') {
      return setAlertError("Vui lòng điền đầy đủ các trường!")
    } else {
      const checkPassword = {
        email: user.email,
        pw: oldPass
      }
      console.log(checkPassword)
  
      await axios.post(`http://localhost:9090/api/accounts/check-password`, checkPassword)
        .then((res) => {
          if (res.data === false) setAlertError("Mật khẩu cũ chưa đúng!")
          else {
            if (newPass === oldPass) setAlertError("Mật khẩu mới trùng với mật khẩu cũ!")
            else if (newPass.length < 8 || newPass.length > 20) {
              setAlertError("Mật khẩu phải chứa ít nhất 8-20 kí tự!");
            }
            else if (!newPass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=]).{8,}$/)) {
                setAlertError(
                    "Mật khẩu cần chứa ít nhất 1 kí tự viết thường, 1 kí tự viết hoa, 1 kí tự đặc biệt và 1 chữ số."
                );
            }
            else if (newPass !== confirmPass) setAlertError("Mật khẩu xác nhận chưa khớp!")
            else {
              const account = {
                email: user.email,
                pw: newPass
              }

              console.log(account)
  
              axios.put(`http://localhost:9090/api/accounts/password`, account)
                .then((res1) => {
                  console.log(res1.data)
                  setShowAlert(false)
                  setNofification("Mật khẩu mới đã được cập nhật!")
                  setTimeout(handleCloseNotify, 1500)
                })
                .catch((err) => {
                  console.log(err)
                  setAlertError("Đã xảy ra lỗi! Vui lòng thử lại.")
                })
            }
          }
        })
        .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
    }
  }

  const [notify, setNotify] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

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
    oldPassRef.current.value = ''
    newPassRef.current.value = ''
    confirmPassRef.current.value = ''
  };

  return (
    <div className='change-password'>
      <h3>Đổi mật khẩu</h3>
      <FormControl sx={{ m: 0.8 }} fullWidth variant="outlined">
        <InputLabel htmlFor="old-password">Mật khẩu cũ *</InputLabel>
        <OutlinedInput required inputRef={oldPassRef}
          id="old-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="OldPassword"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
        <InputLabel htmlFor="new-password">Mật khẩu mới *</InputLabel>
        <OutlinedInput required inputRef={newPassRef}
          id="new-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="NewPassword"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
        <InputLabel htmlFor="confirm-new-password">Xác nhận mật khẩu mới *</InputLabel>
        <OutlinedInput required inputRef={confirmPassRef}
          id="confirm-new-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="ConfirmPassword"
        />
      </FormControl>
      <Button variant='contained' className='submit-new-pass themeColor' onClick={handleChangePassword}>Cập nhật</Button>

      {(showAlert || showNotify) &&
        <Alert icon={showAlert ? <ErrorRounded /> : <CheckRounded />} className='alert'
          severity={showAlert ? "error" : "success"} sx={{ width: '100%' }}>
          { notify }
        </Alert>
      }
    </div>
  )
}

export default ChangePassword
