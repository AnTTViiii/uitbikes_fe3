import React from 'react'
import { StoreRounded, EnergySavingsLeafRounded, ShoppingCartRounded, GppGoodRounded, LocationOn } from '@mui/icons-material'
import './about-us.css'
const AboutUs = () => {
  return (
    <div className='about-us'>
        <h1 className='about-us-heading'>Về chúng tôi</h1>
        <img src='https://res.cloudinary.com/dpwehcnso/image/upload/v1696316426/uitbikes/AboutUsBanner_yfc2oy.png' alt='about us' />
        <h2>I – Sứ mệnh và tầm nhìn</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis lorem non magna imperdiet, eu sollicitudin diam semper. Nunc vel cursus urna. Donec luctus eleifend lacus a tempus. Morbi feugiat, nulla sit amet lacinia convallis, lorem erat auctor justo, vel egestas tellus dui quis orci. Integer laoreet nisi in neque auctor elementum. Donec mi dui, imperdiet scelerisque finibus id, pharetra quis dolor. Pellentesque scelerisque velit vel ipsum porta, id rhoncus nisi tincidunt. Praesent viverra massa id aliquet tempor. Nam lacinia nulla sed nisl cursus laoreet. Vivamus lacinia aliquet nisi. Fusce ac orci ac enim tempus sodales.</p>
        <br/><p>Vestibulum vitae mi at nisi porta bibendum. Vivamus urna est, viverra ut eros non, tempor porta mauris. Mauris vulputate felis nisi, ac malesuada sem euismod in. Morbi in eros efficitur, convallis magna vel, tincidunt eros. Aliquam eu magna felis. Proin dictum massa sit amet sem fringilla, ut pretium urna auctor. Fusce ultrices leo fringilla urna vulputate, in consequat nibh placerat. Duis laoreet nisi a efficitur fermentum. Donec placerat ipsum id enim viverra gravida vel in sapien. Donec id porta nibh.</p>
        <h2>II – Thế mạnh của chúng tôi</h2>
        <p>
        – Maecenas lacinia ex eu maximus condimentum. Morbi a purus volutpat, ullamcorper neque vulputate, pretium lectus.
        <br/>– Ut semper massa eu metus suscipit, eu venenatis dui sagittis. Fusce ac augue fermentum libero viverra volutpat et sed arcu.
        <br/>– Nulla lobortis tellus sed diam semper eleifend. Praesent vel justo quis sapien dignissim tempor.
        <br/>– Ut vehicula risus in massa consectetur, sit amet fringilla urna luctus.
        <br/>– Duis vitae odio tempor, semper erat non, scelerisque lacus. Sed sed orci ut nulla sollicitudin congue quis quis purus.
        <br/>– Vestibulum sed lorem vitae est rutrum consectetur vel eu arcu.
        </p>
        <h2>III – Đặc điểm nổi bật</h2>
        <div className='about-feature'>
            <div>
                <ShoppingCartRounded />
                <div>
                    <p>Miễn phí vận chuyển</p>
                    <p>Nulla lobortis tellus sed diam semper eleifend.</p>
                </div>
            </div>
            <div>
                <GppGoodRounded />
                <div>
                    <p>100% thanh toán an toàn</p>
                    <p>Ut vehicula risus in massa consectetur.</p>
                </div>
            </div>
            <div>
                <StoreRounded />
                <div>
                    <p>Đảm bảo chất lượng</p>
                    <p>Duis vitae odio tempor, semper erat non.</p>
                </div>
            </div>
            <div>
                <EnergySavingsLeafRounded />
                <div>
                    <p>Đảm bảo chất lượng</p>
                    <p>Vestibulum sed lorem vitae est rutrum.</p>
                </div>
            </div>
        </div>
        <h2>IV – Văn phòng của chúng tôi</h2>
        <p style={{display: 'flex', alignItems: 'center', gap: '10px'}}><LocationOn />Trường Đại học CNTT, Khu phố 6, P.Linh Trung, TP.Thủ Đức, TP. HCM</p>
    </div>
  )
}

export default AboutUs
