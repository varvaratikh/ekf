import React, { useState } from 'react';
import axios from 'axios';
import RedRegisterButton from "./RedRegisterButton";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const url = `https://193.124.33.166:8094/users/register`;

        try {
            const res = await axios.post(url, null, {
                params: {
                    username: email,
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                withCredentials: false // This is necessary if your API requires cookies or authentication
            });

            setResponse(res.data); // assuming the response is either 0 or -1

            if (res.data && res.data !== -1) {
                navigate('/uploading');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="max-w-sm w-full mx-auto mt-8">
            <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email" className="sr-only">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="E-mail"
                        className="w-full p-4 text-xl border border-gray-300 h-14"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        className="w-full p-4 text-xl border border-gray-300 h-14"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {response !== null && (
                    <div className="mt-4">
                        {response === 0 ? (
                            <p className="text-green-500">User registered successfully!</p>
                        ) : (
                            <p className="text-red-500">User already exists!</p>
                        )}
                    </div>
                )}
            </form>
            <div className="mt-24">
                <RedRegisterButton handleRegister={handleRegister} />
            </div>
        </div>
    );
};

export default RegisterForm;
