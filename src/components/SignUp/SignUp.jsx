import { TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Alert } from '@mui/material'
import { VisibilityOff, Visibility, Error } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(error !== null ? true : false);

    const setAlertError = (error) => {
        setError(error);
        setShowAlert(true);
    };

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    //api signup
    async function handleSignUp(event) {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        console.log(username, email, password, passwordConfirm);

        if (!username || !email || !password || !passwordConfirm) {
            return setAlertError("Vui lòng nhập đầy đủ thông tin!");
        }

        if (password.length < 8 || password.length > 20) {
            return setAlertError("Mật khẩu phải chứa ít nhất 8-20 kí tự!");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=]).{8,}$/)) {
            return setAlertError(
                "Mật khẩu cần chứa ít nhất 1 kí tự viết thường, 1 kí tự viết hoa, 1 kí tự đặc biệt và 1 chữ số."
            );
        }
        if (password !== passwordConfirm) {
            return setAlertError("Mật khẩu xác nhận không khớp!");
        }

        event.preventDefault();

        try {
            const user = { 
                email: email,
                pw: password,
                username: username
            };

            await axios.get('http://localhost:9090/api/accounts/' + user.username)
                .then(res => {
                    if(res.data.username !== undefined)
                        setAlertError(res.data.username + ' đã tồn tại!');
                    else {
                        axios.post('http://localhost:9090/api/accounts', user);
                        setError(null);
                        setShowAlert(false);
                        alert("Đăng ký tài khoản thành công!");
                        navigate("/signin");
                    }
                })
                .catch(error => {
                    console.log(error);
                    setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
                });
        } catch (error) {
            console.log(error);
            setAlertError('Đã xảy ra lỗi! Vui lòng thử lại.');
        }
    }
    return (
        <div className='signup'>
            <h3>Tạo tài khoản UIT Bikes</h3>
            <div>
                <TextField inputRef={usernameRef} fullWidth id="outlined-basic" className='signup-username' label="Tên đăng nhập" size='small' type='text' variant="outlined" />
                
                <TextField inputRef={emailRef} fullWidth id="outlined-basic" className='signup-email' label="Email" size='small' type='email' variant="outlined" />

                <FormControl size='small' variant="outlined" className='signup-password' fullWidth >
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

                <FormControl size='small' variant="outlined" className='signup-password' fullWidth >
                    <InputLabel htmlFor="outlined-adornment-password">Xác nhận lại mật khẩu</InputLabel>
                    <OutlinedInput
                        inputRef={passwordConfirmRef}
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
                
                <Button variant="contained" className='signup-submit' color="error" 
                        onClick={(e) => handleSignUp(e)}>                             
                    Đăng ký
                </Button>

                {showAlert && (
                    <Alert className='alert'
                        icon={<Error fontSize="inherit" />}
                        severity="warning"
                        sx={{ margin: "10px 0" }}>
                        {error}
                    </Alert>
                )}

                <p>Đã có tài khoản? <Link to={'/signin'}>Đăng nhập ngay!</Link></p>
            </div>
        </div>
    )
}

export default SignUp
