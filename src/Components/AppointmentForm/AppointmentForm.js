import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error, setError] = useState('');

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
        setAppointmentTime(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Validate form
        if (!name || !phoneNumber || !appointmentDate || !appointmentTime) {
            setError('Please fill out all fields');
            return;
        }

        onSubmit({ name, phoneNumber, appointmentDate, appointmentTime });
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setAppointmentTime('');
        setError('');
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <h2>Book an Appointment with Dr. {doctorName}</h2>
            <p>Specialty: {doctorSpeciality}</p>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <select
                    id="appointmentTime"
                    value={appointmentTime}
                    onChange={(e) => handleSlotSelection(e.target.value)}
                    required
                >
                    <option value="">Select a Time Slot</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                </select>
            </div>

            <button type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentFormIC;
