import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const getUserName = () => {
    const emailParts = username.split("@");
    return emailParts[0]; // Assuming the username is the part before the @ in the email
  };

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear the session data
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");
    localStorage.removeItem("appointmentData");

    // Remove the reviewFormData from local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }

    // Reset login state
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    navigate("/"); // Redirect to homepage
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail);
    }
  }, []);

  return (
    <header>
      <nav className="nav">
        <div className="nav__logo">
          <Link to="/">
            StayHealthy{" "}
            <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
          </Link>
          <span>.</span>
        </div>
        <div className="nav__icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
        <ul className={click ? "nav__links active" : "nav__links"}>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            {isLoggedIn ? (
              <Link to="/BookingConsultation">Appointments</Link>
            ) : (
              <button
                className="btn1"
                onClick={() => navigate("/login")}
              >
                Log in to book an appointment
              </button>
            )}
          </li>
          <li className="link">
            <Link to="Healthblog">Health Blog</Link>
          </li>
          <li className="link">
            <Link to="ReviewForm">Reviews</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="link welcome-user" onClick={handleDropdown}>
                Welcome, {getUserName()}
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="ProfileCard">Your Profile</Link>
                    </li>
                    <li>
                      <Link to="ReportsLayout">Your Reports</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="link">
                <button type="button" className="btn2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="link">
                <Link to="signup">
                  <button type="button" className="btn1">
                    Sign Up
                  </button>
                </Link>
              </li>
              <li className="link">
                <Link to="login">
                  <button type="button" className="btn1">
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
