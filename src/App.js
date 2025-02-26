import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing_Page from "./Components/Landing_Page/Landing_Page"; // Import Landing_Page
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation"; // Import InstantConsultation
import FindDoctorSearchIC from "./Components/FindDoctorSearchIC/FindDoctorSearchIC"; // Import the new FindDoctorSearchIC component

import "./App.css"; // Keep existing styles if needed

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} /> {/* Set Home route */}
          <Route path="/instant-consultation" element={<InstantConsultation />} /> {/* Add route for Instant Consultation */}
          <Route path="/find-doctor-search" element={<FindDoctorSearchIC />} /> {/* Add route for FindDoctorSearch component */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
