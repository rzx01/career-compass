import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response.status);
      if (response.status === 404) {
        setMessage('User not found.');
        return;
      }

      if (response.status === 400) {
        setMessage('Invalid password.');
        return;
      }

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);
        console.log(token);
        navigate('/');
      }
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 ring-blue-500 ring-4 rounded-xl py-12 p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Login</h2>
      <form onSubmit={handleLogin} className=" p-6 rounded-md shadow-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 dark:bg-blue-800 rounded-md hover:bg-blue-500 dark:hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-500 dark:text-red-400">{message}</p>}
    </div>
  );
};

export default Login;
