import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { error } from 'console';
import yelpApi from '../http/httpConfig';
import api from '../api/apiConfig';


interface BusinessData {
  name: string;
  image_url: string
}

interface ReviewData {
  id: string;
  review: string;
  restaurant_id: string;
  user: {
    id: string;
    username: string;
  };
  rating: number;
  text: string;
  date: string; // You can use the appropriate date format (string) used in your Django model
}

const Business: React.FC = () => {
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState('');
  const [fetchedReviews, setFetchedReviews] = useState<ReviewData[]>([]);

  // useEffect(() => {
  //   async function getBusiness(): Promise<void> {
  //     try {
  //       const yelpResponse = await yelpApi.get(`/businesses/${id}`);
  //       setBusiness(yelpResponse.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getBusiness();
  // }, [id]);

  // Fetch reviews for the business
  useEffect(() => {
    async function fetchReviews(): Promise<void> {
      try {
        const response = await api.get(`/reviews/${id}`);
        setFetchedReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReviews();
  }, [id]);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const reviewData = {
        review: '',
        rating: '',
        restaurant_id:''
      };
      // if (image) {
      //   reviewData.append('image', image);
      // }
      console.log('newReview:', newReview);
      console.log('rating:', rating);
      console.log('id:', id);

      reviewData.review = newReview;
      reviewData.rating= rating;

      if (id) {
        reviewData.restaurant_id = id;
      } else {
        // Handle the case where id is undefined (if needed)
      }
      

      // reviewData.restaurant_id= id;


      console.log(reviewData)

      // const response = await api.post('review/create/', reviewData);
      // console.log(response)
      // Create a dummy response 
      const dummyResponse = {
        status: 200,
        data: {
          review_id: '123'
        },
      }

      if (dummyResponse.status === 200 && dummyResponse.data.review_id) {
        console.log('hi')
        const newReviewId = dummyResponse.data.review_id;
        navigate(`/reviews/${newReviewId}`);
      }

      // if (response.status === 200 && response.data.review_id) {
      //   const newReviewId = response.data.review_id;
      //   navigate(`/reviews/${newReviewId}`);
      // }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h1>{business?.name}</h1>
      <img src={business?.image_url} alt={business?.name} />
      <div className="reviews">
        <h2>Reviews for {business?.name}</h2>
        {fetchedReviews.map((review) => (
          <div key={review.id}>
            <h3>Rating: {review.rating}</h3>
            <p>Text: {review.text}</p>
            <p>Written by: {review.user.username}</p>
            <p>Date: {review.date}</p>
          </div>
        ))}
      </div>

      <div className="review-container">
        <form onSubmit={handleReviewSubmit}>
          <label htmlFor="review">Leave a review</label>
          <textarea name="review" id="review" value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
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
          <button type="submit">Post Review</button>
        </form>
      </div>
    </div>
  );
};

export default Business;