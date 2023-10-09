import { TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='login'>
            <h3>Chào mừng trở lại với UIT Bikes!</h3>
            <TextField fullWidth id="outlined-basic" className='login-email' label="Email" size='small' type='email' variant="outlined" />
            <FormControl size='small' variant="outlined" className='login-password' fullWidth >
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>

            <div>
                <p><Link to={'/resetpw'}>Quên mật khẩu?</Link></p>
            </div>
            
            <Button variant="contained" className='login-submit' color="error" onClick={''}>                             
                Đăng nhập
            </Button>

            <p>Chưa có tài khoản? <Link to={'/register'}>Đăng ký ngay!</Link></p>
        </div>
    )
}

export default Login
