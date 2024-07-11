import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl">Hackoholics</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/register" className="hover:underline">Зарегистрироваться</a></li>
                    <li><a href="/login" className="hover:underline">Войти</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
