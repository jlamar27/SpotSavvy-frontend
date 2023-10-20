import React from 'react';
import Modal from 'react-modal';

interface DeleteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteReviewModal({ isOpen, onClose }: DeleteReviewModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <div>
        <h2>Review Deleted</h2>
        <p>Your review has been deleted.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
