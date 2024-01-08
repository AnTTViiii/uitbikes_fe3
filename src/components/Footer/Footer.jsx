import React from 'react'
import './footer.css'
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { GitHub } from '@mui/icons-material';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div id='footer' className='footer'>
      <div className='footer-col-1'>
        <h2>UIT Bikes</h2>
        <p><b>Địa chỉ:</b> Trường Đại học CNTT, Khu phố 6, P.Linh Trung, TP.Thủ Đức, TP. HCM</p>
        <p><b>Điện thoại:</b> 1234567890</p>
      </div>
      <div className="footer-col-2">
        <h2>HỖ TRỢ KHÁCH HÀNG</h2>
        <div className='hr'></div>
        <p><b>Hotline:</b> 1234567890 (8:00 - 19:00)</p>
        <p><b>Email:</b> uitbikes@gmail.com</p>
        <a href="/">Chính sách giải quyết khiếu nại</a>
        <a href="/">Chính sách bảo mật</a>
      </div>
      <div className="footer-col-3">
        <h2>VỀ CHÚNG TÔI</h2>
        <div className="hr"></div>
        <a href="/about">Giới thiệu</a>
        <a href="/about">Điều khoản sử dụng</a>
        <a href="/about">Quy chế hoạt động</a>
        <div className='template-navigate'>
          <IconButton className='icon-btn'>
            <Link to={"http://localhost:3000"}>
              <GitHub sx={{color: '#2B2B37'}} fontSize='large' />
            </Link>
          </IconButton>
          <IconButton className='icon-btn'>
            <Link to={"http://localhost:3001"}>
              <GitHub sx={{color: '#306C6C'}} fontSize='large' />
            </Link>
          </IconButton>
          <IconButton className='icon-btn'>
            <Link to={"http://localhost:3002"}>
              <GitHub sx={{color: '#ce252a'}} fontSize='large' />
            </Link>
          </IconButton>
          <IconButton className='icon-btn'>
            <Link to={"http://localhost:3003"}>
              <GitHub sx={{color: '#8C52FF'}} fontSize='large' />
            </Link>
          </IconButton>
        </div>
      </div>
      <p className='copyright'>&#169; {year}. All rights reserved.</p>
    </div>
  )
}

export default Footer
