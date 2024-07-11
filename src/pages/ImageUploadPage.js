import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploadPage = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Handle file upload here
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <header className="bg-gray-800 py-4 flex justify-center items-center w-full">
                <img src="../images/logo.png" alt="logo" className="h-12 mr-4" />
                <h1 className="text-white text-xl">EKF</h1>
            </header>
            <div {...getRootProps({ className: 'dropzone' })} className="w-96 h-72 border-2 border-dashed border-red-500 flex items-center justify-center mt-8 mb-6">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Отпустите файл здесь...</p> :
                        <p>Выбрать файл</p>
                }
            </div>
            <button className="bg-gray-300 py-2 px-4 rounded">Отправить</button>
        </div>
    );
};

export default FileUploadPage;
