import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import './reset-pass.css'

const ResetPass = () => {
    let code;
    const sendCode = (event) => {
        code = Math.floor(100000 + Math.random() * 900000);
        console.log(code);
        let result = document.getElementById('success');
        result.style.display = 'block';
        result.innerHTML = "Mã xác nhận đã được gửi đến email của bạn.";
        document.querySelector('.confirm-code').style.display = 'flex';
    }

    const resetPassword = (event) => {
        const pass = Math.floor(10000000 + Math.random() * 90000000);
        console.log(pass);

    }

    return (
        <div className='reset-pass'>
            <h1>Đặt lại mật khẩu</h1>
            <div className="enter-email">
                <TextField id="outlined-basic" className='reset-pass-email' label="Email" size='small' type='email' variant="outlined" />
                <Button variant="contained" className='reset-pass-email' color="error" onClick={sendCode}>                             
                    Gửi mã
                </Button>
            </div>
            <p id='success'></p>
            <div className='confirm-code'>
                <TextField id="outlined-basic" className='reset-pass-code' label="Mã xác nhận" size='small' type='email' variant="outlined" />
                <Button variant="contained" className='reset-pass-code' color="error" onClick={resetPassword}>                             
                    Xác nhận
                </Button>
            </div>
        </div>
    )
}

export default ResetPass
