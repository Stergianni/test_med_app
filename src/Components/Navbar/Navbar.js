import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem("auth-token");

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">StayHealthy</Link>
            </div>

            <ul className="nav__links">
                <li className="link"><Link to="/">Home</Link></li>
                <li className="link"><Link to="/appointments">Appointments</Link></li>
                <li className="link"><Link to="/instant-consultation"><button className="btn1">Instant Consultation</button></Link></li>

                {authToken ? (
                    <>
                        <li className="link">
                            <button className="btn1" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link"><Link to="/signup"><button className="btn1">Sign Up</button></Link></li>
                        <li className="link"><Link to="/login"><button className="btn1">Login</button></Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
