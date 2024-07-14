import React, {useState} from 'react';
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
import SideModalOneElement from "./components/SideModalOneElement";


const App = () => {
    const [isOneElementModalOpen, setOneElementIsModalOpen] = useState(false);
    const [isAllElementsModalOpen, setAllElementsIsModalOpen] = useState(false);

    const handleOneElementModal = () => {
        setOneElementIsModalOpen(!isOneElementModalOpen);
    };

    const handleAllElementsModal = () => {
        setAllElementsIsModalOpen(!isAllElementsModalOpen);
    };

    return (
        <div className="bg-page">
            <div className="container mx-auto font-sans">
                <Header />
                <SideModalOneElement isOpen={isOneElementModalOpen} onRequestClose={handleOneElementModal} />
                {/*<AllElements isOpen={isAllElementsModalOpen} onRequestClose={handleAllElementsModal} />*/}
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
