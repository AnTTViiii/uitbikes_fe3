import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className='change-password'>
      <h3>Đổi mật khẩu</h3>
      <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu cũ</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword}
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
        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword}
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
        <InputLabel htmlFor="outlined-adornment-password">Xác nhận mật khẩu mới</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword}
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
      <Button variant='contained' className='submit-new-pass'>Cập nhật</Button>
    </div>
  )
}

export default ChangePassword
