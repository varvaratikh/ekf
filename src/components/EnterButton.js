import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnterButton = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-8">
            <button
                onClick={() => navigate('/login')}
                type="button"
                className="bg-custom-red text-custom-wight font-bold w-[335px] h-[44px] text-[20px]"
            >
                Войти
            </button>
        </div>
    );
};

export default EnterButton;
