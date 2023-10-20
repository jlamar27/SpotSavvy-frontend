import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { error } from 'console';
import api from '../api/apiConfig';
import yelp from '../http/httpConfig';


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

interface YelpReview {
  text: string;
  rating: number;
  time_created: string;
  user: {
    name: string;
  };
}


const Business: React.FC = () => {
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState('');
  const [fetchedReviews, setFetchedReviews] = useState<ReviewData[]>([]);
  const [yelpReviews, setYelpReviews] = useState<YelpReview[] | null>(null);

  useEffect(() => {
    async function getBusiness(): Promise<void> {
      try {
        const yelpResponse = await yelp.get(`/businesses/${id}`);
        setBusiness(yelpResponse.data);

        const yelpReviewResponse = await yelp.get(`/businesses/${id}/reviews`)
        setYelpReviews(yelpReviewResponse.data.reviews)
      } catch (error) {
        console.error(error);
      }
    }
    getBusiness();
  }, [id]);

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
        restaurant_id: '',
        rating: '',
        text: ''
      };
      reviewData.text = newReview;
      reviewData.rating = rating
      if (id) {
        reviewData.restaurant_id = id;
      }

      console.log(id)
      const response = await api.post('review/create/', reviewData);
      if (response.status === 200 && response.data.review_id) {
        const newReviewId = response.data.review_id;
        navigate(`/${id}/reviews/${newReviewId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className="business-container">
      <div className="left-column">
        <h1>{business?.name}</h1>
        <img src={business?.image_url} alt={business?.name} />
        <div className="fetched-reviews">
          <h2>Reviews for {business?.name}</h2>
          {fetchedReviews.map((review) => (
            <div key={review.id}>
              <h3>Rating: {review.rating}</h3>
              <p>Text: {review.text}</p>
              <p>Written by: {review.user.username}</p>
              <p>Date: {review.date}</p>
            </div>
          ))}

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
      </div>
      <div className="right-column">
        <div className="yelp-reviews">
          <h2>Yelp Reviews for {business?.name}</h2>
          {yelpReviews && yelpReviews.length > 0 ? (
            yelpReviews.map((yelpReview, index) => (
              <div key={index}>
                <h3>Yelp Rating: {yelpReview.rating}</h3>
                <p>Yelp Text: {yelpReview.text}</p>
                <p>Review by: {yelpReview.user.name}</p>
                <p>Review Date: {yelpReview.time_created}</p>
              </div>
            ))
          ) : (
            <p>No Yelp reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Business;