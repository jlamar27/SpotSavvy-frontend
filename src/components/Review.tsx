import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Review() {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState<File | null>(null)

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault()
    try{
      console.log('review', review, 'image: ', image)
    }catch (err) {

    }

  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0){
      const selectedImage = files[0]
      setImage(selectedImage)
    }
  }
  

  return (
    <div>
      <h1>business.name</h1>
      <form onSubmit={handleReviewSubmit} >
        <label htmlFor="review">Leave a review</label>
        <textarea name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        <label htmlFor="imageInput">Attach A Photo</label>
        <input type="file" id='imageInput' name='image' accept='image/*' onChange={handleImageChange} />
        <button>Post Review</button>
      </form>

    </div>
  )
}
