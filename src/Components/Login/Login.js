import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulating a successful login (replace this with actual API request in real world)
      const fakeAuthToken = "fake-auth-token-12345"; // Simulate an auth token

      sessionStorage.setItem("auth-token", fakeAuthToken); // Store the auth token
      sessionStorage.setItem("email", formData.email); // Store email (you can store more info if needed)

      // Optionally store user details (such as username)
      sessionStorage.setItem("name", formData.email); // You can store any other user info

      // Redirect to home page after login (or to any other page)
      navigate("/"); // Using navigate to redirect instead of window.location.href
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
