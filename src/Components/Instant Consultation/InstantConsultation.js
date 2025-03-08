import React, { useState, useEffect } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                setFilteredDoctors(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter(doctor =>
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    };

    return (
        <div>
            <FindDoctorSearch onSearch={handleSearch} />
            <div className="doctor-list">
                {filteredDoctors.map(doctor => (
                    <DoctorCardIC key={doctor.id} {...doctor} />
                ))}
            </div>
        </div>
    );
};

export default InstantConsultation;
