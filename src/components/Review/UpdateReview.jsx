import { RemoveCircleRounded } from '@mui/icons-material'
import { Button, Rating, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import './update-review.css'
import axios from 'axios'

const UpdateReview = ({item}) => {
  const [imgList, setImgList] = useState([])

  useEffect(() => {
    if (item.id !== undefined) {
      axios.get(`http://localhost:9090/api/reviews/${item.id}`)
        .then((res) => {
          setImgList(res.data.images)
        })
    }
  }, [item.id, imgList])

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
        
        axios.put(`http://localhost:9090/api/reviews/${item.id}/add-image`, res.data.url, {headers: {"Content-Type": "text/plain"}})
          .then((res1) => {
            setImgList(res1.data.images)
          })
          .catch((err) => { console.log(err) })
      })
      .catch((err) => {console.log(err)});
  }

  const handleRemoveReviewImage = (imgId, idx) => {
    axios.delete(`http://localhost:9090/api/reviews/remove-image/${imgId}`)
      .then((res) => {
        if (res.data) {
          handleImgRemove(idx)
        }
      })
      .catch((err) => console.log(err))
  }

  const textRef = useRef()
  const [rating, setRating] = useState(0)

  const handleUpdateReview = () => {
    const body = {
      rate: rating === 0 ? item.rate : rating,
      text: textRef.current.value
    }

    axios.put(`http://localhost:9090/api/reviews/${item.id}`, body)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className='update-review'>
      <p>Sửa đánh giá</p>
      {item.product !== undefined && (
        <div className='update-review-body'>
          <div className="update-review-product-detail">
            <img src={item.product.image} alt={item.product.name} />
            <div>
              <p>{item.product.name}</p>
              <p>Màu: {item.product.color}</p>
            </div>
          </div>
          
          <div className="update-review-content">
            <div className='review-content-rating'>
              1: Rất không hài lòng → 5: Rất hài lòng
              <Rating onChange={(e) => {setRating(e.target.value)}} defaultValue={item.rate} />
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
                  <RemoveCircleRounded onClick={() => { handleRemoveReviewImage(img.id, idx) }} />
                  <img src={img.image} alt={idx} />
                </div>
              ))}
            </div>
            <p>Chọn tối đa 5 ảnh</p>

            <TextField type='text' inputRef={textRef} multiline rows={4} defaultValue={item.text} className="update-review-text" fullWidth />
            <Button variant='contained' onClick={() => { handleUpdateReview() }} >Cập nhật đánh giá</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateReview
