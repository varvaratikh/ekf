import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterButton = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-8">
            <button
                onClick={() => navigate('/register')}
                type="button"
                className="bg-custom-grey text-custom-black font-bold w-[335px] h-[44px] text-[20px]"
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default RegisterButton;
