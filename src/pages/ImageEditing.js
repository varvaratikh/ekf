import React from 'react';
import { useLocation } from 'react-router-dom';

const ImageEditingPage = () => {
    const location = useLocation();
    const { image } = location.state || {}; // Fallback to avoid destructuring undefined
console.log(image)
    return (
        <div className="flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            <div className="w-4/6 h-1/2 flex flex-col items-center justify-center mt-8 mb-20">
                {image ? (
                    <img src={image} alt="Uploaded file" className="max-h-2/5" />
                ) : (
                    <p>No image uploaded</p>
                )}
            </div>
            <button className="bg-custom-red py-2 px-40">Скачать .csv</button>
        </div>
    );
};

export default ImageEditingPage;
