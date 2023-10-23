import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useLocation
import api from '../http/httpConfig';
import DeleteReviewModal from './DeleteReviewModal';

export default function Review() {
  const { reviewId, businessId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const rating = searchParams.get('rating');
  const text = searchParams.get('text');
  const username = searchParams.get('username');
  const date = searchParams.get('date');

  const [review, setReview] = useState<any>({
    rating,
    text,
    user: { username },
    date,
  });
  const [editedReview, setEditedReview] = useState('');
  const [editedRating, setEditedRating] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);


  function formatDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    async function fetchReview(): Promise<void> {
      try {
        const response = await api.get(`/reviews/${reviewId}`);
        const reviewData = response.data; // Assuming the API response has the necessary structure

        // Populate the edit fields with the existing review data
        setEditedReview(reviewData.review);
        setEditedRating(reviewData.rating);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReview();
  }, [reviewId]);

  async function handleEditReview(e: React.FormEvent) {
    e.preventDefault();
    try {
      const editedReviewData = {
        id: reviewId,
        review: editedReview,
        rating: editedRating,
      };

      const response = await api.put(`/review/edit/${reviewId}`, editedReviewData);
      if (response.status === 200) {
        setEditSuccess(true);

        // After a short delay, navigate back to the business page
        setTimeout(() => {
          setEditSuccess(false);
          navigate(`/business/${businessId}`);
        }, 3000); // Adjust the delay time as needed
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteReview() {
    try {
      const response = await api.delete(`/review/delete/${reviewId}`);
      if (response.status === 204) {
        setModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Edit Review</h1>
      {editSuccess && <p className="success-message">Edit successful. Redirecting...</p>}
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
          <p>Date: {formatDateToMMDDYYYY(review.date)}</p>
          <button onClick={deleteReview}>Delete Review</button>
        </div>
      )}
      <DeleteReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate(`/business/${businessId}`);
        }}
      />
    </div>
  );
}
