// Review.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http/httpConfig';

export default function Review() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const [editedReview, setEditedReview] = useState('');
  const [editedRating, setEditedRating] = useState('');

  useEffect(() => {
    async function fetchReview(): Promise<void> {
      try { 
        const response = await api.get(`/reviews/${reviewId}`);
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReview();
  }, [reviewId]);

  // Handle editing the review
  async function handleEditReview(e: React.FormEvent) {
    e.preventDefault();
    try {
      const editedReviewData = {
        id: reviewId,
        review: editedReview,
        rating: editedRating,
      };

      console.log(editedReviewData)
      const response = await api.put(`/reviews/${reviewId}`, editedReviewData);
      if (response.status === 200) {
        // Review updated successfully, you can navigate to the review page or display a success message.
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Edit Review</h1>
      {review && (
        <div>
          <h3>Rating: {review.rating}</h3>
          <p>Text: {review.text}</p>
          <p>Written by: {review.user.username}</p>
          <p>Date: {review.date}</p>
        </div>
      )}
      <form onSubmit={handleEditReview}>
        <label htmlFor="editedReview">Edit your review</label>
        <textarea name="editedReview" id="editedReview" value={editedReview} onChange={(e) => setEditedReview(e.target.value)}></textarea>
        <label htmlFor="editedRating">Edit Rating:</label>
        <select
          name="editedRating"
          id="editedRating"
          onChange={(e) => setEditedRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
