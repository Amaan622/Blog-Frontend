import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBlog, FaChevronLeft } from "react-icons/fa";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        credentials
      );

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
        'Login failed. Please check backend connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[90%] mx-auto min-h-screen flex-col justify-center px-6 py-10 lg:px-8">

      {/* Back Button */}
      <div
        className="text-xl font-bold cursor-pointer text-red-600 mb-4"
        onClick={() => window.history.back()}
      >
        <FaChevronLeft />
      </div>

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <FaBlog className="mx-auto h-10 w-auto text-red-600" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New member?{' '}
          <a href="/signup" className="font-semibold text-red-600">
            Register here
          </a>
        </p>

      </div>
    </div>
  );
}