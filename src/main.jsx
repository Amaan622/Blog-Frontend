import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Components/Login';
import Signup from './Components/Signup.jsx';
import AddBlog from './Components/AddBlog.jsx';
import EditBlog from './Components/EditBlog.jsx'; // <-- import EditBlog
import Navbar from './Components/Navbar.jsx';
import Profile from './Components/Profile.jsx';
import Footer from './Components/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} /> {/* <-- new route */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </StrictMode>
);
