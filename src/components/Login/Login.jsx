import { TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Alert } from '@mui/material'
import { VisibilityOff, Visibility, Error } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { authActions } from '../../stores/auth'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(error !== null ? true : false);

    const setAlertError = (error) => {
        setError(error);
        setShowAlert(true);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    
    async function handleLogin (event) {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email, password);

        if (!email || !password) {
        return setAlertError("Vui lòng điền đầy đủ thông tin!");
        }
        //sign in successfully

        event.preventDefault();
        const loginForm = {
            email: email,
            pw: password
        }
        await axios.get('http://localhost:9090/api/accounts/' + email)
            .then((res) => {
                if(res.data.username === undefined)
                    setAlertError("Email này chưa đăng ký tài khoản!");
                else {
                    axios.post('http://localhost:9090/api/accounts/signin', loginForm)
                        .then((res1) => {
                            if (res1.data.username === undefined) {
                                return setAlertError("Email hoặc password không đúng!");
                            } else {
                                setError(null);
                                setShowAlert(false);

                                const account = res1.data;
                                dispatch(authActions.setAuth(account));

                                navigate("/");
                            }
                        }, fail => {
                            console.log(fail);
                            return setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                return setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
            });
    };
    return (
        <div className="login-bg">
        <div className='login'>
            <h3>Chào mừng trở lại với UIT Bikes!</h3>
            <TextField inputRef={emailRef} fullWidth id="outlined-basic" className='login-email' 
                        label="Email" size='small' type='email' variant="outlined" />
            <FormControl size='small' variant="outlined" className='login-password' fullWidth >
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                <OutlinedInput
                    inputRef={passwordRef}
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
            
            <Button variant="contained" className='login-submit' color="error" onClick={(e) => handleLogin(e)}>                             
                Đăng nhập
            </Button>

            {showAlert && (
                <Alert className='alert'
                    icon={<Error fontSize="inherit" />}
                    severity="warning"
                    sx={{ margin: "10px 0" }}>
                    {error}
                </Alert>
            )}

            <p>Chưa có tài khoản? <Link to={'/register'}>Đăng ký ngay!</Link></p>
        </div>
        </div>
    )
}

export default Login
