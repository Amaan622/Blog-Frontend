import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001"; // IMPORTANT FIX

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('topic', formData.topic);

      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await axios.post(
        `${BASE_URL}/api/posts`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // DO NOT manually set Content-Type
          },
        }
      );

      setMessage('Blog post added successfully!');

      setFormData({ title: '', content: '', topic: '' });
      setImageFile(null);

    } catch (error) {
      console.error("ADD BLOG ERROR:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">

      <h2 className="text-3xl font-bold text-red-600 mb-6">
        Create a New Blog Post
      </h2>

      {message && (
        <p className="mb-4 text-sm text-red-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Topic</option>
          <option>Technology</option>
          <option>Sports</option>
          <option>News</option>
          <option>Entertainment</option>
        </select>

        <input
          type="file"
          onChange={handleImageChange}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          {loading ? "Posting..." : "Add Blog"}
        </button>

      </form>
    </div>
  );
};

export default AddBlog;