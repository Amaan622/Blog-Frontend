import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";


const BlogItem = ({
    post,
    onClose,
    handleLike,
    handleDislike,
    handleDelete,
    currentUser
}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    if (!post) return null;

    // ✅ SAFE OWNER CHECK (handles ALL cases)
    let isOwner = false;

    if (currentUser && post?.author) {
        const authorId = post.author?._id || post.author;
        const userId = currentUser?._id || currentUser?.id;

        if (authorId && userId) {
            isOwner = String(authorId) === String(userId);
        }

        // fallback if only username exists
        if (!isOwner && post.author?.username && currentUser?.username) {
            isOwner = post.author.username === currentUser.username;
        }
    }

    const getImageUrl = (image) => {
        if (!image) return null;
        if (image.startsWith('http')) return image;
        return `${BASE_URL}/${image.replace(/^\/+/, '')}`;
    };

    // ✅ CLOSE MENU ON OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]'>
            <div className='bg-white p-6 rounded max-w-4xl w-[90%] relative'>

                {/* CLOSE */}
                <IoClose
                    className='absolute top-4 right-4 text-2xl cursor-pointer'
                    onClick={onClose}
                />

                <div className='grid md:grid-cols-2 gap-6'>

                    {/* LEFT */}
                    <div className='relative'>

                        {post.image && (
                            <img
                                src={getImageUrl(post.image)}
                                alt={post.title}
                                className='w-full rounded'
                            />
                        )}

                        {/* LIKE / DISLIKE */}
                        <div className='flex gap-6 mt-4 items-center'>
                            <div
                                className='flex items-center gap-1 cursor-pointer text-red-600'
                                onClick={() => handleLike(post._id)}
                            >
                                <AiOutlineLike />
                                <span>{post.likes?.length || 0}</span>
                            </div>

                            <div
                                className='flex items-center gap-1 cursor-pointer text-blue-600'
                                onClick={() => handleDislike(post._id)}
                            >
                                <AiOutlineDislike />
                                <span>{post.dislikes?.length || 0}</span>
                            </div>
                        </div>

                        {/* ✅ ALWAYS RENDER ICON (for debug + usability) */}
                        <div className="absolute top-2 right-2 z-[9999]" ref={menuRef}>

                            <BsThreeDotsVertical
                                className="cursor-pointer text-xl"
                                onClick={() => setMenuOpen(prev => !prev)}
                            />

                            {/* ✅ SHOW MENU ONLY IF OWNER */}
                            {menuOpen && isOwner && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-[9999]">

                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate(`/edit/${post._id}`);
                                        }}
                                    >
                                        Edit
                                    </div>

                                    <div
                                        className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                                        onClick={() => {
                                            handleDelete(post._id);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        Delete
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div>
                        <h2 className='text-2xl font-bold mb-2'>
                            {post.title}
                        </h2>

                        <p className='text-sm text-gray-500 mb-2'>
                            {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : "No date"}
                        </p>

                        <p className='text-gray-700'>
                            {post.content}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogItem;