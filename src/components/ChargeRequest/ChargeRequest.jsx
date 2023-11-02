import { TextField, Button, Accordion, AccordionSummary, Typography, AccordionDetails, Dialog, Alert } from '@mui/material'
import React, { useRef, useState } from 'react'
import './charge-request.css'
import { Check, Error, ExpandMoreRounded } from '@mui/icons-material'
import userEvent from '@testing-library/user-event'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ChargeRequest = () => {
  const { isAuthed } = useSelector((state) => state.auth);
  const user = isAuthed ? JSON.parse(localStorage.getItem('user')): []

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

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const handleCloseSuccessDialog = () => setOpenSuccessDialog(false);

  const bankRef = useRef();
  const moneyRef = useRef();
  const dateRef = useRef();

  const [accNum, setAccNum] = useState();

  const handleTypeAccNum = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAccNum(e.target.value);
    }
  };

  const handleSendRequest = () => {
    const accountNumber = bankRef.current.value;
    const money = moneyRef.current.value;
    const date = new Date(dateRef.current.value)

    if (accountNumber === '' || money === '' || date.toString() === 'Invalid Date') {
      console.log('Vui long dien day du!')
      setAlertError("Vui lòng điền đầy đủ thông tin!")
    } else {
      const request = {
        "customer": user.customer,
        "accountNumber": accountNumber,
        "money": money,
        "date": date
      }

      axios.post("http://localhost:9090/api/requests", request)
        .then((res) => {
          setShowAlert(false)
          setNofification("Đã gửi yêu cầu! Quá trình xét duyệt sẽ mất khoảng 2-3 ngày.")
          setOpenSuccessDialog(true);
          console.log(request)
          setTimeout(handleCloseSuccessDialog, 3000)
        })
        .catch((err) => {
          console.log(err)
          return setAlertError("Đã xảy ra lỗi! Vui lòng thử lại.")
        })
    }
  }
  return (
    <>
    <h3>Nạp tiền</h3>
    <div className='charge-request'>
      <div className="qr-transfer">
        <p>Quét mã để chuyển tiền</p>
        <img src='https://res.cloudinary.com/dpwehcnso/image/upload/v1696744142/momo-qr-code_mxogor.png' alt='qr-code' />
      </div>
      <div className="charge-request-form">
        <p>Mẫu nạp tiền</p>
        <TextField inputRef={bankRef} type='text' label="Số tài khoản *" 
          variant="outlined" fullWidth onChange={(e) => handleTypeAccNum(e)}
          value={accNum} />
        <TextField inputRef={moneyRef} type='number' min='0' step='1000' label="Số tiền *"
          variant="outlined" fullWidth InputProps={{inputProps: {min: 0, step: 1000}}} />
        <TextField inputRef={dateRef} type='datetime-local' focused label="Thời gian chuyển khoản *" variant="outlined" fullWidth />
        <Button className='charge-request-btn' onClick={handleSendRequest} variant="contained">Gửi yêu cầu</Button>

        {showAlert && (
          <Alert
              icon={<Error fontSize="inherit" />}
              severity="warning"
              sx={{ margin: "10px 0" }}>
              {notify}
          </Alert>
        )}
        
        <Dialog open={openSuccessDialog}
                onClose={handleCloseSuccessDialog}>
          <Alert onClose={handleCloseSuccessDialog} icon={<Check fontSize="inherit" />}
            severity="success" sx={{ width: '100%' }}>
            { notify }
          </Alert>
        </Dialog>
      </div>
    </div>
    <Accordion className='charge-request-guide'>
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        id="panel1a-header"
      >
        <Typography>Hướng dẫn nạp tiền</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <p>
            1. Quét mã QR để chuyển tiền vào tài khoản hệ thống UIT Bikes bằng ví điện tử MOMO của khách hàng.
            <br/>2. Điền thông tin vào mẫu nạp tiền, trong đó: 
            <br/> + Số tài khoản: là số điện thoại thực hiện chuyển khoản;
            <br/> + Số tiền: số tiền khách hàng đã chuyển vào tài khoản của hệ thống.
            <br/> + Thời gian chuyển tiền: thời gian giao dịch xử lý thành công trên ví MOMO.
          </p>
        </Typography>
      </AccordionDetails>
    </Accordion>
    </>
  )
}

export default ChargeRequest
