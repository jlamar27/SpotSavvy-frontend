import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { error } from 'console';
import api from '../api/apiConfig';
import yelp from '../http/httpConfig';


interface BusinessData {
  name: string;
  image_url: string;
  phone: string;
  location: {
    display_address: string[];
  };
  price: string;
  userAddress: string
}

interface ReviewData {
  id: string;
  review: string;
  restaurant_id: string;
  username: string;
  rating: number;
  text: string;
  date: string;
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
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState('1');
  const [fetchedReviews, setFetchedReviews] = useState<ReviewData[]>([]);
  const [yelpReviews, setYelpReviews] = useState<YelpReview[] | null>(null);


  useEffect(() => {
    async function getBusiness(): Promise<void> {
      try {
        const yelpResponse = await yelp.get(`/businesses/${businessId}`);
        setBusiness(yelpResponse.data);


        const yelpReviewResponse = await yelp.get(`/businesses/${businessId}/reviews`)
        setYelpReviews(yelpReviewResponse.data.reviews)
      } catch (error) {
        console.error(error);
      }
    }
    getBusiness();
  }, [businessId]);


  useEffect(() => {
    async function fetchReviews(): Promise<void> {
      try {
        const response = await api.get(`/reviews/${businessId}`);
        console.log(response.data)
        setFetchedReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReviews();
  }, [businessId]);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const reviewData = {
        id: '',
        restaurant_id: '',
        rating: '',
        text: ''
      };
      console.log(reviewData)
      reviewData.text = newReview;
      reviewData.rating = rating
      if (businessId) {
        reviewData.restaurant_id = businessId;
      }

      console.log(businessId)
      const response = await api.post('review/create/', reviewData);
      if (response.status === 200 && response.data.review_id) {
        const newReviewId = response.data.id;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function formatDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="business-container">
      <div className="left-column">
        <h1>{business?.name}</h1>
        <img src={business?.image_url} alt={business?.name} />
        <p>Phone: {business?.phone}</p>
        <p>
          <a
            href={
              business?.location.display_address
                ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  business.location.display_address.join(", ")
                )}&origin=${encodeURIComponent(business.userAddress || '')}`
                : '#'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </p>
        <p>Address: {business?.location.display_address.join(', ')}</p>
        <p>Price: {business?.price}</p>
        <div className="fetched-reviews">
          <h2>Reviews for {business?.name}</h2>
          {fetchedReviews.map((review) => (
            <a
              key={review.id}
              href={`/${businessId}/reviews/${review.id}?text=${review.text}&rating=${review.rating}&username=${review.username}&date=${review.date}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <h3>Rating: {review.rating}</h3>
                <p>{review.text}</p>
                <p>{review.username}</p>
                <p>Date: {formatDateToMMDDYYYY(review.date)}</p>
              </div>
            </a>
          ))}

          <div className="review-container">
            <form onSubmit={handleReviewSubmit}>
              <label htmlFor="review">Leave a review</label>
              <textarea className='review' name="review" id="review" value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
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
                <p>Review Date: {formatDateToMMDDYYYY(yelpReview.time_created)}</p>
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