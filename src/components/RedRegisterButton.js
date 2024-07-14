import React from 'react';
import {useNavigate} from "react-router-dom";

const RedRegisterButton = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-8">
            <button
                onClick={() => navigate('/uploading')}
                type="button"
                className="bg-[#DB0912] text-white font-bold w-[335px] h-[44px] text-[20px]">
                Зарегистрироваться
            </button>
        </div>
    );
};

export default RedRegisterButton;
