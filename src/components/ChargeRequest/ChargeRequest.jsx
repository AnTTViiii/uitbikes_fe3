import { TextField, Button } from '@mui/material'
import React from 'react'
import './charge-request.css'

const ChargeRequest = () => {
  return (
    <>
    <h3>Nạp tiền</h3>
    <div className='charge-request'>
      <div className="qr-transfer">
        <p>Quét mã để chuyển tiền</p>
        <img src='https://res.cloudinary.com/dpwehcnso/image/upload/v1696744142/momo-qr-code_mxogor.png' alt='qr-code' />
      </div>
      <div className="charge-request-form">
        <TextField id="outlined-basic" label="Số tài khoản" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Tên chủ tài khoản" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Số tiền" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Thời gian chuyển tiền" variant="outlined" fullWidth />
        <Button className='charge-request-btn' variant="contained">Gửi yêu cầu</Button>
      </div>
    </div>
    </>
    
  )
}

export default ChargeRequest
