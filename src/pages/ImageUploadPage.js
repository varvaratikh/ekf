import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import burger from '../images/Burger.png';

const ImageUploadPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [base64File, setBase64File] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.response) {
            const { userId, images } = location.state.response;
            setUserId(userId);
            setImages(images);
        }
    }, [location.state]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 1) {
            alert('Пожалуйства, выберите 1 файл.');
            return;
        }

        const file = acceptedFiles[0];
        setUploadedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64File(reader.result);
        };

        reader.readAsDataURL(file);
    }, []);

    const removeImage = () => {
        setUploadedFile(null);
        setBase64File('');
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handelModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSend = async () => {
        console.log('Sending image...');
        console.log('Base64 File:', base64File);

        if (!base64File) {
            alert('Пожалуйста, загрузите файл.');
            return;
        }

        const formData = new FormData();
        formData.append('image', uploadedFile);

        try {
            const response = await axios.post('https://193.124.33.166:8094/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('Response:', response.data);
                navigate('/editing', { state: { image: base64File, userId, response: response.data } });
            } else {
                console.error('Request failed:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            {uploadedFile ? (
                <div className="w-4/6 flex flex-col items-center justify-center mt-8 mb-10">
                    <div className="relative">
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 p-1"
                            onClick={removeImage}
                        >
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded file" className="max-h-[70vh] max-w-full object-contain" />
                    </div>
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone' })} className={`w-4/6 h-1/2 border-3 border-dashed
          ${isDragActive ? 'border-custom-red' : 'border-custom-blue'} flex items-center justify-center mt-8 mb-10
          border-custom-blue hover:border-custom-red hover:cursor-pointer`}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Отпустите файл здесь...</p> :
                            <p>Выберите файл</p>
                    }
                </div>
            )}

            <button onClick={handleSend} className="bg-custom-grey py-2 px-40 cursor-pointer mb-10">Отправить</button>
        </div>
    );
};

export default ImageUploadPage;

