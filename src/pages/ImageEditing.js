import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DownloadCSV from "../components/DownloadCSV";
import SideModalComponent from '../components/SideModalComponent';
import burger from '../images/Burger.png';

const ImageEditingPage = () => {
    const location = useLocation();
    const { image, userId, response } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState(response?.images || []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            <div className="absolute top-1.5 right-0">
                <img
                    src={burger}
                    alt="Open Modal"
                    className="w-8 h-5 cursor-pointer"
                    onClick={openModal}
                />
            </div>
            {image ? (
                <div className="w-4/6 flex flex-col items-center justify-center mt-8 mb-10">
                    <img src={image} alt="Uploaded file" className="max-h-[70vh] max-w-full object-contain" />
                </div>
            ) : (
                <p>No image uploaded</p>
            )}
            {userId && response && (
                <div>
                    <p>User ID: {userId}</p>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            <DownloadCSV/>
            <SideModalComponent isOpen={isModalOpen} onRequestClose={closeModal} images={images} />
        </div>
    );
};

export default ImageEditingPage;
