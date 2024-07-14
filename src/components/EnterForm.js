import React from 'react';
import {Link} from "react-router-dom";

const EnterForm = () => {
    return (
        <div className="max-w-sm w-full mx-auto mt-8">
            <form className="space-y-5">
                <div>
                    <label htmlFor="email" className="sr-only">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="E-mail"
                        className="w-full p-4 text-xl border border-gray-300 h-14"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        className="w-full p-4 text-xl border border-gray-300 h-14"
                    />
                </div>
                {/*<div className="text-right">*/}
                {/*    <Link to="/forgot-password" className="text-gray-500 hover:underline">Забыли пароль?</Link>*/}
                {/*</div>*/}
            </form>
        </div>
    );
};

export default EnterForm;
