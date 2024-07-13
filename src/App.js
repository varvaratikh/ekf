import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUploadPage from './pages/ImageUploadPage';
import GreetingPage from "./pages/GreetingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ImageEditing from "./pages/ImageEditing";
import ImageEditingPage from "./pages/ImageEditing";
import DownloadCSV from "./components/DownloadCSV";
import EnterButton from "./components/EnterButton";
import RedRegisterButton from "./components/RedRegisterButton";
import RegisterButton from "./components/RegisterButton";
import Header from "./components/Header";
import SendButton from "./components/SendButton";
import RedSendButton from "./components/RedSendButton";
import EnterForm from "./components/EnterForm";


const App = () => {
    return (
        <div className="container mx-auto font-sans">
            <Header />
            <main>
                {/*<DownloadCSV/>*/}
                {/*<EnterButton/>*/}
                {/*<RedRegisterButton/>*/}
                {/*<RegisterButton/>*/}
                {/*<SendButton/>*/}
                {/*<RedSendButton/>*/}
                {/*<EnterForm/>*/}
                {/*<DownloadCSV />*/}
                <Router>
                    <Routes>
                        {/*<Route path="/" element={<GreetingPage />} />*/}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<ImageUploadPage />} />
                        <Route path="/editing" element={<ImageEditingPage />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
};

export default App;

