import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EnterButton from "./EnterButton";

const EnterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const url = `https://193.124.33.166:8091/users/login`;

        try {
            const res = await axios.post(url, null, {
                params: {
                    username: email,
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            setResponse(res.data);

            // Navigate to /uploading with the response data
            if (res.data && res.data.userId !== -1) {
                navigate('/uploading', { state: { response: res.data } });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    return (
        <div className="max-w-sm w-full mx-auto mt-8">
            <form className="space-y-5" onSubmit={handleLogin}>
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
                <div className="mt-24">
                    <EnterButton handleLogin={handleLogin} />
                </div>
            </form>
            {response && (
                <div className="mt-4">
                    <h2>Response Data</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default EnterForm;
