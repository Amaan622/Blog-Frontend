import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import BlogItem from './BlogItem';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const BlogHome = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // ✅ DEBUG USER
    console.log("USER:", user);

    useEffect(() => {
        fetchPosts();
    }, []);

    // close menu on outside click
    useEffect(() => {
        const closeMenu = () => setMenuOpenId(null);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/posts`);
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (postId) => {
        await axios.put(`${BASE_URL}/api/posts/${postId}/like`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchPosts();
    };

    const handleDislike = async (postId) => {
        await axios.put(`${BASE_URL}/api/posts/${postId}/dislike`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchPosts();
    };

    const handleDelete = async (postId) => {
        await axios.delete(`${BASE_URL}/api/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setPosts(prev => prev.filter(p => p._id !== postId));
        setMenuOpenId(null);
    };

    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith("http")) return img;
        return `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
    };

    const getProfilePic = (pic) => {
        if (!pic) return null;
        return `${BASE_URL}/uploads/${pic}`;
    };

    return (
        <div className="max-w-7xl mx-auto w-[90%] py-10">

            <h2 className="text-4xl text-center font-bold mb-10">
                Welcome to the blog
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

                {posts.map(post => {

                    // ✅ DEBUG POST AUTHOR
                    console.log("POST AUTHOR:", post.author);

                    const authorId = post.author?._id || post.author;
                    const userId = user?._id || user?.id;

                    const isOwner = String(authorId) === String(userId);

                    return (
                        <div
                            key={post._id}
                            className="shadow p-4 rounded relative overflow-visible"
                        >

                            {/* IMAGE */}
                            {post.image && (
                                <img
                                    src={getImageUrl(post.image)}
                                    className="w-full h-48 object-cover rounded mb-3 cursor-pointer"
                                    alt={post.title}
                                    onClick={() => setSelectedPost(post)}
                                />
                            )}

                            {/* TITLE */}
                            <h3
                                className="font-bold text-lg cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                {post.title}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                                {post.content}
                            </p>

                            {/* ✅ AUTHOR PROFILE (RESTORED) */}
                            <div className="flex items-center gap-2 mt-3">

                                {post.author?.profilePic ? (
                                    <img
                                        src={getProfilePic(post.author.profilePic)}
                                        className="w-8 h-8 rounded-full object-cover"
                                        alt="profile"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                                        {post.author?.username?.charAt(0) || "U"}
                                    </div>
                                )}

                                <span>{post.author?.username || "Unknown"}</span>
                            </div>

                            {/* LIKES */}
                            <div className="flex gap-4 mt-3">
                                <div
                                    onClick={() => handleLike(post._id)}
                                    className="flex items-center gap-1 cursor-pointer text-red-600"
                                >
                                    <AiOutlineLike />
                                    {post.likes?.length || 0}
                                </div>

                                <div
                                    onClick={() => handleDislike(post._id)}
                                    className="flex items-center gap-1 cursor-pointer text-blue-600"
                                >
                                    <AiOutlineDislike />
                                    {post.dislikes?.length || 0}
                                </div>
                            </div>

                            {/* ✅ MENU */}
                            <div className="absolute top-3 right-3 z-[9999]">

                                <BsThreeDotsVertical
                                    className="cursor-pointer text-xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpenId(
                                            menuOpenId === post._id ? null : post._id
                                        );
                                    }}
                                />

                                {menuOpenId === post._id && (
                                    <div className="absolute right-0 top-6 w-32 bg-white border rounded shadow-lg">

                                        {isOwner ? (
                                            <>
                                                <div
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => navigate(`/edit/${post._id}`)}
                                                >
                                                    Edit
                                                </div>

                                                <div
                                                    className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    Delete
                                                </div>
                                            </>
                                        ) : (
                                            <div className="px-4 py-2 text-gray-400">
                                                Not allowed
                                            </div>
                                        )}

                                    </div>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

            {selectedPost && (
                <BlogItem
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleDelete={handleDelete}
                    currentUser={user}
                />
            )}
        </div>
    );
};

export default BlogHome;