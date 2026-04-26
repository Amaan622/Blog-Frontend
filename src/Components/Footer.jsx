import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-red-500 text-white py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-center md:text-left mb-2 md:mb-0">
                    © {new Date().getFullYear()} Md Amaan — Blog Project. All rights reserved.
                </p>

                <div className="flex gap-4 text-lg">
                    <a
                        href="https://github.com/Amaan622"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mdamaanrahman/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
