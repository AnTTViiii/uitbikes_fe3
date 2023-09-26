import React from 'react'
import './footer.css'
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
        <p><b>Hotline:</b> 1234567890 (9:00 - 21:00)</p>
        <p><b>Email:</b> uitbikes@gmail.com</p>
        <a href="/">Chính sách giải quyết khiếu nại</a>
        <a href="/">Chính sách bảo mật</a>
      </div>
      <div className="footer-col-3">
        <h2>VỀ CHÚNG TÔI</h2>
        <div className="hr"></div>
        <a href="/">Giới thiệu</a>
        <a href="/">Điều khoản sử dụng</a>
        <a href="/">Quy chế hoạt động</a>
        <a href="/">Trung tâm khách hàng</a>
        <a href="/">Hỏi đáp (FAQ)</a>
      </div>
      <p className='copyright'>&#169; {year}. All rights reserved.</p>
    </div>
  )
}

export default Footer
