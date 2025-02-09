import React from 'react';


const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black-950 to-blue-950">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-white animate-bounce">404</h1>
                <p className="text-2xl font-medium text-gray-300 mt-4">Page Not Found</p>
                <p className="text-gray-400 mt-2">Sorry, the page you are looking for does not exist.</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;