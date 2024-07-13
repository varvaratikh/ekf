import React from 'react';
import RegisterForm from "../components/RegisterForm";
import RedRegisterButton from "../components/RedRegisterButton";


const RegisterPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-1">
            <h1 className="text-3xl font-semibold text-center text-custom-black mb-12">Прогнозирование коммерческого <br/> предложения</h1>
            <div className="w-full max-w-sm">
                <RegisterForm/>
                <div className="mt-24">
                    <RedRegisterButton/>
                </div>
            </div>
            <p className="absolute bottom-0 right-0 mb-4 mr-2 text-custom-team-logo text-lg font-semibold">Hackoholics</p>
        </div>
    );
};

export default RegisterPage;
