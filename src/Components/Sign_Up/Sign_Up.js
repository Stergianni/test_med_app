import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.phone.match(/^\d{10}$/)) errors.phone = "Enter a valid 10-digit phone number";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Enter a valid email";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Sign-up successful!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="signup-grid">
        <h1>Sign Up</h1>
        <p>
          Already a member? <Link to="/login" style={{ color: "#2190FF" }}>Login</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter your phone number" />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Enter your password" />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" className="btn btn-danger" onClick={() => setFormData({ name: "", phone: "", email: "", password: "" })}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;
