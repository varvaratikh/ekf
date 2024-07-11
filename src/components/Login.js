import React from 'react';

const Login = () => {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
            <h2 className="text-2xl mb-4">Войти</h2>
            <form className="space-y-4">
                <label className="block">
                    <span className="block text-gray-700">E-mail:</span>
                    <input type="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </label>
                <label className="block">
                    <span className="block text-gray-700">Пароль:</span>
                    <input type="password" name="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </label>
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">Войти</button>
                <a href="/forgot-password" className="block text-center text-blue-600 hover:underline">Забыли пароль?</a>
            </form>
        </div>
    );
};

export default Login;
