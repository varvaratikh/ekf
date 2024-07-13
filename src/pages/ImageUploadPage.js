import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from "react-router-dom";

const ImageUploadPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [base64File, setBase64File] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 1) {
            alert('Пожалуйста, выберите только 1 файл.');
            return;
        }

        const file = acceptedFiles[0];
        setUploadedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            setBase64File(reader.result);
        };

        reader.readAsDataURL(file);
    }, []);

    const removeImage = () => {
        setUploadedFile(null);
        setBase64File('');
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div className="flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            {uploadedFile ? (
                <div className="w-4/6 h-1/2 flex flex-col items-center justify-center mt-8 mb-20">
                    <div className="relative">
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 p-1"
                            onClick={removeImage}
                        >
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded file" className="max-h-2/5" />
                    </div>
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone' })} className={`w-4/6 h-1/2 border-3 border-dashed 
                ${isDragActive ? 'border-custom-red' : 'border-custom-blue'} flex items-center justify-center mt-8 mb-20 
                border-custom-blue hover:border-custom-red hover:cursor-pointer`}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Отпустите файл здесь...</p> :
                            <p>Выбрать файл</p>
                    }
                </div>
            )}
            <Link to={{
                pathname: "/editing",
                state: { image: base64File }
            }} className="bg-custom-grey py-2 px-40">Отправить</Link>
        </div>
    );
};

export default ImageUploadPage;
