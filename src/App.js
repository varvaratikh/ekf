import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import PredictionForm from './components/PredictionForm';
import DownloadCSV from './components/DownloadCSV';

import ImageUploadPage from './pages/ImageUploadPage';


const App = () => {
    return (
        <div className="container mx-auto p-4 font-sans">
            {/*<Header />*/}
            <main>
                {/*<Login />*/}
                {/*<Register />*/}
                {/*<FileUpload />*/}
                {/*<FileList />*/}
                {/*<PredictionForm />*/}
                {/*<DownloadCSV />*/}
                <ImageUploadPage />
            </main>
        </div>
    );
};

export default App;
