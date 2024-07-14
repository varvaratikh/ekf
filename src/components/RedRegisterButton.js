import React from 'react';

const RedRegisterButton = ({ handleRegister }) => {

    return (
        <div className="text-center mt-8">
            <button
                onClick={handleRegister}
                type="button"
                className="bg-custom-red text-custom-wight font-bold w-[335px] h-[44px] text-[20px]">
                Зарегистрироваться
            </button>
        </div>
    );
};

export default RedRegisterButton;
