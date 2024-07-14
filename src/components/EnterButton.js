import React from 'react';

const EnterButton = ({ handleLogin }) => {

    return (
        <div className="text-center mt-8">
            <button
                onClick={handleLogin}
                type="submit"
                className="bg-custom-red text-custom-wight font-bold w-[335px] h-[44px] text-[20px]"
            >
                Войти
            </button>
        </div>
    );
};

export default EnterButton;
