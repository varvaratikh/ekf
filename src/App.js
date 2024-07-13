import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import ImageUploadPage from './pages/ImageUploadPage';
import GreetingPage from "./pages/GreetingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ImageEditing from "./pages/ImageEditing";
import ImageEditingPage from "./pages/ImageEditing";
import EditElement from "./pages/EditElement";
import AllElements from "./pages/AllElements";


const App = () => {
    return (
        <div className="container mx-auto font-sans">
            <Header />
            <main>
                <Router>
                    <Routes>
                        <Route path="/hello" element={<GreetingPage />} />
                        <Route path="/" element={<AllElements />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/uploading" element={<ImageUploadPage />} />
                        <Route path="/editing" element={<ImageEditingPage />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
};

export default App;
