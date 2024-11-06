import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact_number: '',
    job: '',
    education: ''
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    emailError: '',

    passwordError: '',
    confirmPasswordError: '',
    contactNumberError: '',
    jobError: '',
    educationError: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [`${name}Error`]: '' });
    setServerError('');
  };

  const validateForm = () => {
    let isValid = true;
    const { username, email, password, confirmPassword, contact_number, job, education } = formData;
    let newErrors = {};

    if (username.trim() === '') {
      newErrors.usernameError = 'Username is required.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    if (!emailPattern.test(email)) {
      newErrors.emailError = 'Invalid email address format.';
      isValid = false;
    }

  
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
    if (!passwordPattern.test(password)) {
      newErrors.passwordError = 'Password must be 7 characters long and include an uppercase letter, a digit, and a special character.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPasswordError = 'Passwords do not match.';
      isValid = false;
    }

    if (contact_number.trim() === '') {
      newErrors.contactNumberError = 'Contact number is required.';
      isValid = false;
    }

    if (job.trim() === '') {
      newErrors.jobError = 'Job title is required.';
      isValid = false;
    }

    if (education.trim() === '') {
      newErrors.educationError = 'Education is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccessMessage('Signup successful!');
          setFormData({
            username: '',
            email: '',
            password: '',
            contact_number: '',
            job: '',
            education: ''
          });
          setServerError('');
          const data = await response.json();
          const token  = data.token;
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          const errorData = await response.json();
          setServerError(errorData.message || 'Sign-up failed. Please try again.');
        }
      } catch (error) {
        setServerError('Undefined error. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md mx-auto ring-blue-500 ring-4">
      <h2 className="text-2xl font-bold text-white mb-6">Signup</h2>
      <form id="registrationForm" onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.usernameError}</span>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.emailError}</span>

        <input
          type="text"
          placeholder="Contact Number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.contactNumberError}</span>

        <input
          type="text"
          placeholder="Job Title"
          name="job"
          value={formData.job}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.jobError}</span>

        <input
          type="text"
          placeholder="Education"
          name="education"
          value={formData.education}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.educationError}</span>

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.passwordError}</span>

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-red-400">{errors.confirmPasswordError}</span>

        <button 
          type="submit" 
          className="w-full bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-md hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
        >
          Signup
        </button>

        {successMessage && <p className="text-green-400 mt-4">{successMessage}</p>}
        {serverError && <p className="text-red-400">{serverError}</p>}
      </form>
    </div>
  );
};

export default Signup;
