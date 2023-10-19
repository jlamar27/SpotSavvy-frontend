import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http/httpConfig'
import { error } from 'console';


interface BusinessData {
  name: string;
  image_url: string
}

interface ReviewData {
  id: string;
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
  const [image, setImage] = useState<File | null>(null);
  const [fetchedReviews, setFetchedReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    async function getBusiness(): Promise<void> {
      try {
        const yelpResponse = await api.get(`/businesses/${id}`);
        setBusiness(yelpResponse.data);
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
      const reviewData = new FormData();
      if (image) {
        reviewData.append('image', image);
      }
      reviewData.append('review', newReview);
      reviewData.append('rating', rating);
      reviewData.append('restaurant_id', id || '');

      const response = await api.post('/reviews', reviewData);

      if (response.status === 201 && response.data.review_id) {
        const newReviewId = response.data.review_id;
        navigate(`/reviews/${newReviewId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);
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
          <label htmlFor="imageInput">Attach A Photo</label>
          <input type="file" id="imageInput" name="image" accept="image/*" onChange={handleImageChange} />
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