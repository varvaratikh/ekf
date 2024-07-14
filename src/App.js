import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import SideModalOneElement from "./components/SideModalOneElement";

import ImageUploadPage from './pages/ImageUploadPage';
import GreetingPage from "./pages/GreetingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ImageEditingPage from "./pages/ImageEditing";


const App = () => {
    const [isOneElementModalOpen, setOneElementIsModalOpen] = useState(false);

    const handleOneElementModal = () => {
        setOneElementIsModalOpen(!isOneElementModalOpen);
    };

    return (
        <div className="bg-page">
            <div className="container mx-auto font-sans">
                <Header />
                <SideModalOneElement isOpen={isOneElementModalOpen} onRequestClose={handleOneElementModal} />
                <main>
                    <Router>
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
