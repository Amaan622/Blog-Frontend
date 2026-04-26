import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser || !token) {
            setLoading(false);
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        fetchPosts(parsedUser);
    }, []);

    const fetchPosts = async (parsedUser) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/posts`);

         const userPosts = res.data.filter((post) => {
    const author = post.author;

    if (!author) return false;

    const authorName =
        typeof author === "object"
            ? author.username
            : null;

    return authorName === parsedUser.username;
});

            setPosts(userPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIXED PROFILE IMAGE FUNCTION
    const getProfileImage = () => {
        if (!user?.profilePic) return null;

        // already full URL
        if (user.profilePic.startsWith('http')) {
            return user.profilePic;
        }

        // already has /uploads
        if (user.profilePic.startsWith('/uploads')) {
            return `${BASE_URL}${user.profilePic}`;
        }

        // normal filename
        return `${BASE_URL}/uploads/${user.profilePic}`;
    };

    const handleProfilePicUpdate = async (file) => {
        if (!file) return;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('profilePic', file);

            const res = await axios.put(
                `${BASE_URL}/api/user/profile-pic`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));

        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!user) return <div className="text-center mt-10">Please log in.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">

            {/* HEADER */}
            <div className="flex items-center gap-6 mb-8">

                <div className="relative">

                    {user.profilePic ? (
                        <img
                            src={getProfileImage()}
                            alt={user.username}
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-4xl text-white">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <input
                        type="file"
                        className="mt-2 text-sm"
                        onChange={(e) =>
                            handleProfilePicUpdate(e.target.files[0])
                        }
                    />

                    {uploading && (
                        <p className="text-xs text-gray-500">Uploading...</p>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <p className="text-gray-600">{user.email}</p>

                    <button
                        onClick={handleLogout}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* POSTS */}
            <h2 className="text-2xl font-semibold mb-4">
                Your Blog Posts
            </h2>

            {posts.length === 0 ? (
                <p className="text-gray-500">
                    You haven't written any posts yet.
                </p>
            ) : (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="border p-4 rounded shadow"
                        >
                            <h3 className="text-xl font-semibold">
                                {post.title}
                            </h3>

                            <p className="text-gray-700 mt-2">
                                {post.content}
                            </p>

                            <div className="text-sm text-gray-500 mt-2">
                                Topic: {post.topic} |{" "}
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;