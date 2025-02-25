import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './InstantConsultation.css';

const InstantConsultation = () => {
  // State for storing filtered doctors
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  
  const [searchParams] = useSearchParams(); // To access query params
  const doctorsData = [
    { name: 'Dr. John Doe', specialty: 'Cardiologist' },
    { name: 'Dr. Jane Smith', specialty: 'Dentist' },
    { name: 'Dr. Emily White', specialty: 'Dermatologist' },
    // Add more doctor data here...
  ];

  // Use useEffect to handle the search when query param changes
  useEffect(() => {
    if (searchParams.get('speciality')) {
      const filtered = doctorsData.filter(
        (doctor) =>
          doctor.specialty.toLowerCase() ===
          searchParams.get('speciality').toLowerCase()
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  }, [searchParams]);

  return (
    <div className="consultation-container">
      <h2>Instant Consultation</h2>
      {isSearched ? (
        filteredDoctors.length > 0 ? (
          <div className="doctor-list">
            {filteredDoctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors found for the selected specialty.</p>
        )
      ) : (
        <p>Search for a doctor by specialty.</p>
      )}
    </div>
  );
};

export default InstantConsultation;
