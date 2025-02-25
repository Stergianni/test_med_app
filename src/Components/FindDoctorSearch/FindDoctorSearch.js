import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';

const FindDoctorSearch = () => {
  // State to hold the specialty input value
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  // Handle change in input field (specialty)
  const handleInputChange = (e) => {
    setSpecialty(e.target.value);
  };

  // Handle form submission or search
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (specialty) {
      // Redirect to the Instant Consultation page with the specialty as a query parameter
      navigate(`/instant-consultation?speciality=${specialty}`);
    }
  };

  return (
    <div className="search-container">
      <h2>Find a Doctor</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="specialty">Enter Doctor's Specialty</label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={handleInputChange}
            className="form-control"
            placeholder="e.g., Cardiologist, Dentist"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default FindDoctorSearch;
