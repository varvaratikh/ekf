import React from 'react';
import { useLocation } from 'react-router-dom';
import DownloadCSV from "../components/DownloadCSV";

const ImageEditingPage = () => {
    const location = useLocation();
    const { image, userId, response } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            <div className="w-4/6 flex flex-col items-center justify-center mt-8 mb-10">
                {image ? (
                    <img src={image} alt="Uploaded file" className="max-h-[70vh] max-w-full object-contain" />
                ) : (
                    <p>No image uploaded</p>
                )}
            </div>
            {userId && response && (
                <div>
                    <p>User ID: {userId}</p>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            <DownloadCSV/>
        </div>
    );
};

export default ImageEditingPage;
