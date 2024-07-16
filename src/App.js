import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import ImageUploadPage from './pages/ImageUploadPage';
import GreetingPage from "./pages/GreetingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ImageEditingPage from "./pages/ImageEditing";


const App = () => {

    return (
        <div className="bg-page">
            <div className="container mx-auto font-sans">
                <main>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<GreetingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/uploading" element={<ImageUploadPage />} />
                            <Route path="/editing" element={<ImageEditingPage />} />
                        </Routes>
                    </Router>
                </main>
            </div>
        </div>
    );
};

export default App;
