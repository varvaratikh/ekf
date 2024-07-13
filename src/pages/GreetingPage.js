import React from 'react';
import { Link } from 'react-router-dom';

const GreetingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            <h1 className="text-3xl font-semibold pt-40 text-center text-custom-black">Прогнозирование коммерческого <br/> предложения</h1>
            <div className="flex flex-col items-center space-y-4 pt-40">
                <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ">Login</Link>
                <Link to="/register" className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mt-4">Register</Link>
            </div>
            <p className="absolute bottom-0 right-0 mb-4 mr-2 text-custom-team-logo text-lg font-semibold">Hackoholics</p>
        </div>
    );
};

export default GreetingPage;
