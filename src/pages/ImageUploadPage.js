import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDropzone } from 'react-dropzone';
import SideModalComponent from '../components/SideModalComponent';
import burger from '../images/Burger.png';

const ImageUploadPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [base64File, setBase64File] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate(); // Initialize navigate from useNavigate()

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
            alert('Please select only 1 file.');
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSend = () => {
        navigate('/editing', { state: { image: base64File } });
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            <div className="absolute top-4 right-4">
                <img
                    src={burger}
                    alt="Open Modal"
                    className="w-8 h-5 cursor-pointer"
                    onClick={openModal}
                />
            </div>

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
                            <p>Drop the file here...</p> :
                            <p>Select a file</p>
                    }
                </div>
            )}

            {/* Updated Link to use navigate */}
            <button onClick={handleSend} className="bg-custom-grey py-2 px-40 cursor-pointer">Send</button>

            <SideModalComponent isOpen={isModalOpen} onRequestClose={closeModal} images={images} />
        </div>
    );
};

export default ImageUploadPage;
