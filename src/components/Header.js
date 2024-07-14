import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => {
    const location = useLocation();
    const nonClickablePaths = ["/login", "/register","/"];
    const isNonClickable = nonClickablePaths.includes(location.pathname);

    return (
        <header className="flex items-start p-1">
            {isNonClickable ? (
                <img src={logo} alt="Hackoholics Logo" className="h-8 ml-1 mt-1" />
            ) : (
                <Link to="/uploading">
                    <img src={logo} alt="Hackoholics Logo" className="h-8 ml-1 mt-1" />
                </Link>
            )}
        </header>
    );
};

export default Header;
