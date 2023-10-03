import { TextField, Button } from '@mui/material'
import React from 'react'

const ChargeRequest = () => {
  return (
    <div className='charge-request'>
      <div className="qr-transfer">
        <img src='' alt='qr-code' />
      </div>
      <div className="charge-request-form">
        <TextField id="outlined-basic" label="Số tài khoản" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Tên chủ tài khoản" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Số tiền" variant="outlined" fullWidth />
        <TextField id="outlined-basic" label="Thời gian chuyển tiền" variant="outlined" fullWidth />
        <Button variant="contained">Gửi yêu cầu</Button>
      </div>
    </div>
  )
}

export default ChargeRequest
