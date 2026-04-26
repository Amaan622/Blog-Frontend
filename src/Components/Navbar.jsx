import React, { useState } from 'react';
import { FaBars, FaBlog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const isLoggedIn = localStorage.getItem('token');

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const profileImage = user?.profilePic
    ? `${BASE_URL}/uploads/${user.profilePic}`
    : null;

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className='w-full sticky top-0 z-50 bg-white shadow-sm'>

      {/* MOBILE NAVBAR */}
      <div className='p-4 px-8 flex items-center md:hidden w-full justify-between'>

        <div>
          {open ? (
            <IoClose
              className='text-2xl cursor-pointer text-red-600'
              onClick={() => setOpen(false)}
            />
          ) : (
            <FaBars
              className='text-xl cursor-pointer text-red-600'
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        <a href="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <FaBlog />
        </a>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">

              <a href='/profile'>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    {getInitial(user?.username)}
                  </div>
                )}
              </a>

              <button
                onClick={handleLogout}
                className="text-xs text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="font-semibold text-sm border border-red-400 text-red-600 rounded px-3 py-1"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${open ? "translate-x-0" : "-translate-x-full"} 
        md:hidden bg-white w-full text-center text-sm px-6 pb-5 absolute py-2 space-y-5 shadow-md`}
      >
        <a href="/" className="block hover:text-red-600">Home</a>
        <a href="/add-blog" className="block hover:text-red-600">Add Blog</a>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex items-center justify-between px-10 py-4">

        <a href="/" className="text-red-600 text-2xl font-bold flex items-center gap-2">
          <FaBlog />
        </a>

        <div className="space-x-6 text-gray-700 font-medium text-sm">
          <a href="/" className="hover:text-red-600">Home</a>
          <a href="/add-blog" className="hover:text-red-600">Add Blog</a>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">

              <a href='/profile'>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    {getInitial(user?.username)}
                  </div>
                )}
              </a>

              <button
                onClick={handleLogout}
                className="text-sm text-red-600 border border-red-400 px-3 py-1 rounded"
              >
                Logout
              </button>

            </div>
          ) : (
            <a
              href="/login"
              className="text-red-600 border border-red-400 px-4 py-1 text-sm font-medium rounded"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;