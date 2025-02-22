import React from "react";
import "./Navbar.css"; // Assuming styles are in Navbar.css

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <ul>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
