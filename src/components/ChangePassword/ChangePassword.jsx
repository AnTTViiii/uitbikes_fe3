import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import './change-password.css'
import axios from 'axios';
const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleUpdateAvatar = async() => {
  //   const avt = {}

  //   axios.put(`http://localhost:9090/api/accounts/${user.username}/avatar`, avt)
  //     .then((res) => {
  //       axios.get(`http://localhost:9090/api/accounts/${user.username}`)
  //         .then((res1) => {localStorage.setItem('user', JSON.stringify(res1.data))})
  //         .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
  //       document.getElementById('saveAvatarBtn').style.display = "none";
  //       setSuccess("Ảnh đại diện đã được cập nhật!")
  //       setShowAlertSuccess(true);
  //       setTimeout(() => {
  //         setSuccess(null)
  //         setShowAlertSuccess(false)
  //       }, 3000)
  //     })
  //     .catch((err) => {console.log(err); setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.')})
  // }
  return (
    <div className='change-password'>
      <h3>Đổi mật khẩu</h3>
      <FormControl sx={{ m: 0.8 }} fullWidth variant="outlined">
        <InputLabel htmlFor="old-password">Mật khẩu cũ *</InputLabel>
        <OutlinedInput required
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
        <OutlinedInput required
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
        <OutlinedInput required
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
      <Button variant='contained' className='submit-new-pass bgMainColor'>Cập nhật</Button>
    </div>
  )
}

export default ChangePassword
