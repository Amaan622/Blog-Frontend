import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBlog, FaChevronLeft } from "react-icons/fa";
import axios from 'axios';

const BASE_URL = "http://localhost:5001";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);

      if (profileImage) {
        data.append('profilePic', profileImage);
      }

      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        data
        // ❌ DO NOT set Content-Type manually
      );

      console.log('Signup success:', response.data);

      navigate('/login');

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
        'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[90%] mx-auto min-h-screen flex-col justify-center px-6 py-10 lg:px-8">

      {/* Back */}
      <div
        className="text-xl font-bold cursor-pointer text-red-600 mb-4"
        onClick={() => window.history.back()}
      >
        <FaChevronLeft />
      </div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <FaBlog className="mx-auto h-10 w-auto text-red-600" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </form>

      </div>
    </div>
  );
}