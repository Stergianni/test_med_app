import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Enter a valid email";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Login successful!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <h2>Login</h2>
        <p>
          New member? <Link to="/signup" style={{ color: "#2190FF" }}>Sign Up Here</Link>
        </p>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="reset" className="btn btn-danger" onClick={() => setFormData({ email: "", password: "" })}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
