import React from 'react';
import EnterForm from "../components/EnterForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-1">
            <h1 className="text-3xl font-semibold text-center text-custom-black mb-12">
                Прогнозирование коммерческого <br/> предложения
            </h1>
            <div className="w-full max-w-sm">
                <EnterForm />
            </div>
            <p className="absolute bottom-0 right-0 mb-4 mr-4 text-custom-team-logo text-lg font-semibold">
                Hackoholics
            </p>
        </div>
    );
};

export default LoginPage;
