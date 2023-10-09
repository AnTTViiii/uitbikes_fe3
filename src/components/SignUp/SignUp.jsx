import { TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='signup'>
            <h3>Tạo tài khoản UIT Bikes</h3>
            <div>
                <TextField fullWidth id="outlined-basic" className='signup-username' label="Tên đăng nhập" size='small' type='text' variant="outlined" />
                
                <TextField fullWidth id="outlined-basic" className='signup-email' label="Email" size='small' type='email' variant="outlined" />

                <FormControl size='small' variant="outlined" className='signup-password' fullWidth >
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

                <FormControl size='small' variant="outlined" className='signup-password' fullWidth >
                    <InputLabel htmlFor="outlined-adornment-password">Xác nhận lại mật khẩu</InputLabel>
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
                        label="ConfirmPassword"
                    />
                </FormControl>
                
                <Button variant="contained" className='signup-submit' color="error" onClick={''}>                             
                    Đăng ký
                </Button>

                <p>Đã có tài khoản? <Link to={'/signin'}>Đăng nhập ngay!</Link></p>
            </div>
        </div>
    )
}

export default SignUp
