import React, { useState } from 'react';
//import AppointmentFormIC from './AppointmentFormIC/AppointmentFormIC'; // Import the AppointmentForm component
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';

const DoctorCardIC = ({ doctor }) => {
    // Check if doctor prop exists
    if (!doctor) {
        return <div>Loading...</div>; // Or any appropriate fallback UI
    }

    return (
        <div className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>Speciality: {doctor.speciality}</p>
            <button onClick={handleBookingClick}>Book Appointment</button>

            {isBooking && (
                <AppointmentFormIC
                    doctorName={doctor.name}
                    doctorSpeciality={doctor.speciality}
                    onSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};


export default DoctorCardIC;
