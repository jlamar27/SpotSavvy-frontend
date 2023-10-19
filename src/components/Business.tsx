import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http/httpConfig'
import { error } from 'console';


interface BusinessData {
  name: string;
  image_url: string
}



const Business: React.FC = () => {
  const [business, setBusiness] = useState<BusinessData | null>(null)
  const { id } = useParams()
  const navigate = useNavigate();
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (business) {
      console.log(business)
    }
  }, [business])


  useEffect(() => {
    async function getBusiness(): Promise<any> {
      try {
        // remove the additional /
        const yelpResponse = await api.get(`/businesses/${id}`)
        setBusiness(yelpResponse.data)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [id])


  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const reviewData = new FormData();
      if (image) {
        reviewData.append('image', image);
      }
      reviewData.append('review', review);
      reviewData.append('rating', rating);
      reviewData.append('id', id ?? '')

      const reviewObject: { [key: string]: any } = {}
      reviewData.forEach((value, key) => {
        reviewObject[key] = value

        console.log(reviewObject)
        const newReviewId = 1
        navigate(`/reviews/${newReviewId}`)
      });

      // const response = await backendapi.post(`endpoint to create a review`, reviewObject);

      // if(response.status === 201 && response.data.review_id) {
      //    const newReviewId = response.data.review_id;
      // navigate(`/reviews/${newReviewId}`

    } catch (err) {
      // console.error(error)
    }

  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedImage = files[0]
      setImage(selectedImage)
    }
  }



  return (
    <div>
      <h1>{business?.name}</h1>
      <img src={business?.image_url} alt={business?.name} />

      <div className='review-container'>
        <form onSubmit={handleReviewSubmit} >
          <label htmlFor="review">Leave a review</label>
          <textarea name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
          <label htmlFor="imageInput">Attach A Photo</label>
          <input type="file" id='imageInput' name='image' accept='image/*' onChange={handleImageChange} />
          <label htmlFor="rating">Select Rating:</label>
          <select
            name="rating"
            id="rating"
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button>Post Review</button>
        </form>
        // to save as favorites
        <button >Save</button>
      </div>
    </div>
  )
}

export default Business