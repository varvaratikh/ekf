import React from 'react';
import RegisterButton from "../components/RegisterButton";
import EnterButton from "../components/EnterButton";

const GreetingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-custom-black">
                Прогнозирование коммерческого <br /> предложения
            </h1>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <EnterButton/>
                <RegisterButton/>
            </div>
            <p className="absolute bottom-0 right-0 mb-4 mr-4 text-custom-team-logo text-lg font-semibold">
                Hackoholics
            </p>
        </div>
    );
};

export default GreetingPage;
