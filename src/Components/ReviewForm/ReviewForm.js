import { Table, Button } from 'react-bootstrap';
import "reactjs-popup/dist/index.css";
import GiveReviews from './GiveReviews';
import React, { useState } from 'react';

export default function ReviewForm() {
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: "Dr. Michael Loe", speciality: "Cardiology", review: "", isReviewed: false },
    { id: 2, doctorName: "Dr. Jason Lee", speciality: "Orthopedy", review: "", isReviewed: false },
    { id: 3, doctorName: "Dr. Paula Boe", speciality: "Dermatology", review: "Great consultation", isReviewed: true },
  ]);

  const handleReview = (doctorId, review) => {
    setReviews((prevReviews) =>
      prevReviews.map((reviewData) =>
        reviewData.id === doctorId
          ? { ...reviewData, review: review, isReviewed: true } // Mark as reviewed after submitting
          : reviewData
      )
    );
  };

  return (
    <div style={{ margin: "auto", maxWidth: "800px", marginTop: "10%" }}>
      <h2 style={{ marginBottom: "10px" }}>Reviews</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((reviewData, index) => (
            <tr key={reviewData.id}>
              <td>{index + 1}</td>
              <td>{reviewData.doctorName}</td>
              <td>{reviewData.speciality}</td>
              <td>
                <GiveReviews
                  doctorId={reviewData.id}
                  onHandleReview={handleReview}
                  isReviewed={reviewData.isReviewed} // Pass the reviewed status to the button
                />
              </td>
              <td>{reviewData.review || "No review yet"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
