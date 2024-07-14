import React from 'react';
import Element from '../components/Element';

const AllElements = ({ isOpen, mp }) => {
    // Generate items based on the mp object
    const items = mp ? Object.entries(mp).map(([key, value]) => ({
        color: 'red', // Set default color to red
        text: `${key}: ${value}`
    })) : [];

    const handleClose = () => {
        // Add your logic here to close the popup window
        console.log("Close button clicked!");
    };

    return (
        isOpen ?
            <div className="fixed inset-0 w-2/5 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="h-5/6 bg-white p-6 border border-gray-300 rounded-lg shadow-lg relative">
                    <button
                        className="absolute top-0 left-0 p-1"
                        onClick={handleClose}
                    >
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center">
                        <Element items={items} />
                        <button className="absolute bottom-0 mb-4 p-2 bg-custom-grey text-custom-black">Добавить элемент</button>
                    </div>
                </div>
            </div>
            :
            <div></div>
    );
};

export default AllElements;
