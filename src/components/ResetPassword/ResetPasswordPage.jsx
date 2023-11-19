import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import './reset-pass.css'
import axios from 'axios';

const steps = ['Nhập email', 'Nhập mã xác nhận'];

const ResetPasswordPage = () => {
  const [activeStep, setActiveStep] = useState(0)

  const [isComplete, setIsComplete] = useState(false)

  const [mail, setMail] = useState('')

  const [code, setCode] = useState('')

  const isLastStep = activeStep === steps.length - 1

  const handleNext = () => {
    activeStep === steps.length - 1 ? setIsComplete(true) : setIsComplete(false)
    setActiveStep(activeStep + 1)
  }

  const emailRef = useRef()

  const handleSendCode = () => {
    console.log("click-send-code")
    const emailTemp = emailRef.current.value;
    setMail(emailTemp)

    let resultSuccess = document.getElementById('success');
    let resultError = document.getElementById('error');
    resultSuccess.style.display = 'block';
    resultError.style.display = 'block';
    resultError.innerHTML = ""
    resultSuccess.innerHTML = '';

    if (emailTemp !== '' && emailTemp.match(/^(?=.*[@])(?=.*[.]).{8,}$/)) {
      resultError.innerHTML = ""
      resultSuccess.innerHTML = "Đang xử lý...";
      axios.get(`http://localhost:9090/api/accounts/email/${emailTemp}`)
        .then((res) => {
            if (res.data === true) {
                axios.get(`http://localhost:9090/api/mail/send-code/email/${emailTemp}`)
                    .then((resCode) => {
                      setCode(resCode.data)
                      console.log(resCode.data)

                      resultError.innerHTML = ""
                      resultSuccess.innerHTML = "Mã xác nhận đã được gửi đến email của bạn.";
                      setIsComplete(true)
                    })
                    .catch((err) => console.log(err))
            }
            else {
              resultSuccess.innerHTML = ""
              resultError.innerHTML = "Email này chưa đăng ký tài khoản!";
            }
        })
        .catch((err) => console.log(err))
    } else {
      resultSuccess.innerHTML = "";
      resultError.innerHTML = "Vui lòng nhập email đúng định dạng!";
    }
  }

  console.log(code)

  const codeRef = useRef()

  const handleResetPassword = () => {
    const codeTemp = codeRef.current.value;
    console.log("click-reset-pass: " + codeTemp)

    let resultError = document.getElementById('error')
    let resultSuccess = document.getElementById('success')
    resultSuccess.style.display = 'block'
    resultError.style.display = 'block'
    resultError.innerHTML = ""
    resultSuccess.innerHTML = ''

    if (codeTemp == code && codeTemp !== '') {
      resultSuccess.innerHTML = "Đang xử lý...";
      axios.get(`http://localhost:9090/api/mail/send-new-password/email/${mail}`)
        .then((res) => {
            setIsComplete(true)
            resultError.innerHTML = ""
            resultSuccess.innerHTML = "Mật khẩu đã được đặt lại!"
            console.log(res.data)
            setCode('')
        })
        .catch((err) => console.log(err))
    } else {
      resultSuccess.innerHTML = ""
      resultError.innerHTML = "Mã xác nhận không đúng!"
    }
  }

  return (
    <div className='reset-pass'>
      <Typography component="h1" variant="h4" align="center">
        Đặt lại mật khẩu
      </Typography>
      <div className='reset-pass-body'>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Button className='themeColor noneTextTransform step-completed'>
            <Link to={'/signin'}>Đăng nhập</Link>
          </Button>
        ) : (
          <div className='reset-pass-step'>
            {activeStep === 0 ? (
              <div className="enter-email">
                <TextField inputRef={emailRef} id='outlined1' className='reset-pass-email' label="Email" size='small' type='email' variant="outlined" />
                <Button variant="contained" id='confirm-code-btn' className='reset-pass-email themeColor noneTextTransform' onClick={() => handleSendCode()}>                             
                    Gửi mã
                </Button>
                <div id="success"></div>
                <div id="error"></div>
              </div>
            ) : (
              <div className='confirm-code'>
                <TextField inputRef={codeRef} id='outlined2' className='reset-pass-code' label="Mã xác nhận" size='small' type='text' variant="outlined" />
                <Button variant="contained" id='reset-password-btn' className='reset-pass-code themeColor noneTextTransform' onClick={handleResetPassword}>                             
                    Xác nhận
                </Button>
                <div id="success"></div>
                <div id="error"></div>
              </div>
            )}

            <div className='reset-pass-control-btn'>
              <Button onClick={handleNext} type="submit" disabled={!isComplete} className={`${isComplete ? 'themeColor' : 'bgColor'} noneTextTransform`}>
                {isLastStep ? 'Hoàn thành' : 'Tiếp theo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage
