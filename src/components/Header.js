import React from 'react';
import logo from '../images/logo.png';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="flex items-start p-1">
            <Link to="/uploading">
                <img src={logo} alt="Hackoholics Logo" className="h-8 ml-1 mt-1" />
            </Link>
        </header>
    );
};

export default Header;
