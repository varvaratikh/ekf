import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <header className="flex items-start p-1">
            <img src={logo} alt="Hackoholics Logo" className="h-8 ml-1 mt-1" />
        </header>
    );
};

export default Header;
