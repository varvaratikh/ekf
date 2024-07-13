// import React from 'react';
// import Header from './components/Header';
// import Login from './components/Login';
// import Register from './components/Register';
// import FileUpload from './components/FileUpload';
// import FileList from './components/FileList';
// import PredictionForm from './components/PredictionForm';
// import DownloadCSV from './components/DownloadCSV';
//
// import ImageUploadPage from './pages/ImageUploadPage';
//
//
// const App = () => {
//     return (
//         <div className="container mx-auto p-4 font-sans">
//             {/*<Header />*/}
//             <main>
//                 {/*<Login />*/}
//                 {/*<Register />*/}
//                 {/*<FileUpload />*/}
//                 {/*<FileList />*/}
//                 {/*<PredictionForm />*/}
//                 {/*<DownloadCSV />*/}
//                 <ImageUploadPage />
//             </main>
//         </div>
//     );
// };
//
// export default App;

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function App() {
    const onDrop = useCallback((acceptedFiles) => {
        alert(acceptedFiles[0]?.name || 'No files selected');
        console.log("Now you can do anything with this file as per your requirement");
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div style={{ display: 'block', width: 700, padding: 30 }}>
            <h4>React-Dropzone Module Demo</h4>
            <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #007bff',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                <input {...getInputProps()} />
                <p>Click to select file or drag-and-drop the file here!!</p>
            </div>
        </div>
    );
}
