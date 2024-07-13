import React from 'react';
import Register from "../components/Register";

const RegisterPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            <h1 className="text-3xl font-semibold pt-40 text-center text-custom-black">Прогнозирование коммерческого <br/> предложения</h1>
            <Register />
            <p className="absolute bottom-0 right-0 mb-4 mr-2 text-custom-team-logo text-lg font-semibold">Hackoholics</p>
        </div>
    );
};

export default RegisterPage;
