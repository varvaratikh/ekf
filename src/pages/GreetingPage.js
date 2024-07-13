import React from 'react';
import RegisterButton from "../components/RegisterButton";
import EnterButton from "../components/EnterButton";

const GreetingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            <h1 className="text-3xl font-semibold pt-10 text-center text-custom-black">
                Прогнозирование коммерческого <br /> предложения
            </h1>
            <div className="flex flex-col items-center space-y-4 pt-10">
                <EnterButton />
                <RegisterButton />
            </div>
            <p className="absolute bottom-0 right-0 mb-4 mr-2 text-custom-team-logo text-lg font-semibold">
                Hackoholics
            </p>
        </div>
    );
};

export default GreetingPage;
