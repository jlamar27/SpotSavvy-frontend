import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http/httpConfig';
import DeleteReviewModal from './DeleteReviewModal';

export default function Review() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const [editedReview, setEditedReview] = useState('');
  const [editedRating, setEditedRating] = useState('');
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    async function fetchReview(): Promise<void> {
      try {
        const response = await api.get(`/reviews/${reviewId}`);
        setReview(response.data);

        // Populate the edit fields with the existing review data
        setEditedReview(response.data.review);
        setEditedRating(response.data.rating);
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

      const response = await api.put(`/reviews/${reviewId}`, editedReviewData);
      if (response.status === 200) {
        // inform user that their edit has gone through and redirect back to business page figure out how were goning to get businessid
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteReview() {
    try {
      const response = await api.delete(`/review/delete/${reviewId}`);
      if (response.status === 204) {
        setModalOpen(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Edit Review</h1>
      <form onSubmit={handleEditReview}>
        <label htmlFor="editedReview">Edit your review</label>
        <textarea
          name="editedReview"
          id="editedReview"
          value={editedReview}
          onChange={(e) => setEditedReview(e.target.value)}
        ></textarea>
        <label htmlFor="editedRating">Edit Rating:</label>
        <select
          name="editedRating"
          id="editedRating"
          value={editedRating}
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
      {review && (
        <div>
          <h3>Rating: {review.rating}</h3>
          <p>Text: {review.text}</p>
          <p>Written by: {review.user.username}</p>
          <p>Date: {review.date}</p>
          <button onClick={deleteReview}>Delete Review</button>
        </div>
      )}
      <DeleteReviewModal isOpen={isModalOpen} onClose={() => {
        // Close the modal and navigate back to the business page
        setModalOpen(false);
        navigate(`/business/${businessId}`); // Replace with the actual URL
      }} />
    </div>
  );
}
