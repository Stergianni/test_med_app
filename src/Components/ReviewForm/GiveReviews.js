import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Star from './Star'; // Import star component
import './GiveReviews.css';

function GiveReviews({ doctorId, onHandleReview, isReviewed }) {
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating > 0) {
      // Pass review data back to ReviewForm via onHandleReview
      onHandleReview(doctorId, formData.review);
      setFormData({ name: '', review: '', rating: 0 });
      setShowWarning(false);
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleStarClick = (starIndex) => {
    setFormData({ ...formData, rating: starIndex + 1 });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          selected={i < formData.rating}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleButtonClick}
        disabled={isReviewed} // Disable the button if the review is already submitted
      >
        {isReviewed ? 'Review Submitted' : 'Click Here'}
      </Button>

      <Popup
        style={{ backgroundColor: "#FFFFFF" }}
        modal
        open={showForm}
        onClose={() => setShowForm(false)}
      >
        <section className="review-form">
          <form onSubmit={handleSubmit}>
            <h2>Give Your Review</h2>
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Rating:</label>
              <div className="rating">
                {renderStars()}
              </div>
            </div>
            <Button variant="primary" type="submit">Submit</Button>
          </form>
        </section>
      </Popup>
    </div>
  );
}

export default GiveReviews;
