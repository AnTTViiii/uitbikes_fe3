import { Button, Rating, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import './insert-review.css'
import { RemoveCircleRounded } from '@mui/icons-material'
import axios from 'axios'
import { useSelector } from 'react-redux'

const InsertReview = ({item}) => {
  const { isAuthed } = useSelector((state) => state.auth)
  const user = isAuthed ? JSON.parse(localStorage.getItem('user')) : []

  const [imgList, setImgList] = useState([])

  const handleImgRemove = (index) => {
    const list = [...imgList]
    list.splice(index, 1)
    setImgList(list)
  }

  const handleUploadImg = (e) => {
    var file = e.target.files[0];
    var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
    
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "uitbikes_image");

    axios.post(POST_URL, formdata)
      .then((res)=>{
        console.log(res.data);
        setImgList([...imgList, res.data.url])
      })
      .catch((err) => {console.log(err)});
  }

  const textRef = useRef()
  const [rating, setRating] = useState(5)

  console.log(imgList)

  const handleCreateReview = () => {
    const body = {
      rate: rating,
      text: textRef.current.value,
      detailId: item.detailId,
      customerId: user.customer.id,
      images: imgList
    }

    axios.post(`http://localhost:9090/api/reviews`, body)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className='insert-review'>
      <p>Viết đánh giá cho hoá đơn #{item.invoiceId}</p>
      <div className='insert-review-body'>
        <div className="insert-review-product-detail">
          <img src={item.pImg} alt={item.pName} />
          <div>
            <p>{item.pName}</p>
            <p>Màu: {item.pColor}</p>
          </div>
        </div>
        
        <div className="insert-review-content">
          <div className='review-content-rating'>
            1: Rất không hài lòng → 5: Rất hài lòng
            <Rating defaultValue={5} onChange={(e) => {setRating(e.target.value)}} />
          </div>
          
          <div className="review-imgs">
            {imgList.length < 5 && (
              <div className="review-img-select">
                <label for="review-img-select">➕</label>
                <input id='review-img-select' onChange={(e) => { handleUploadImg(e) }} type="file" accept="image/*" />
              </div>
            )}
            {imgList.length > 0 && imgList.map((img, idx) => (
              <div className='review-img'>
                <RemoveCircleRounded onClick={() => { handleImgRemove(idx) }} />
                <img src={img} alt={idx} />
              </div>
            ))}
          </div>
          <p>Chọn tối đa 5 ảnh</p>

          <TextField variant='outlined' multiline rows={4} inputRef={textRef} label="Nội dung" type='text' className="insert-review-text" fullWidth />
          <Button variant='contained' onClick={() => { handleCreateReview() }}>Đăng đánh giá</Button>
        </div>
      </div>
    </div>
  )
}

export default InsertReview
