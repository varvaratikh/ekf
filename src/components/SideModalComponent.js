import React from 'react';

const SideModalComponent = ({ isOpen, onRequestClose }) => {
    return (
        <div className={`fixed top-0 right-0 h-auto bg-white shadow-lg transition-transform duration-300 
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '278px', height: '800px', margin: '40px 19px', overflowY: 'auto' }}>
            <div className="flex flex-col h-full p-8">
                <div className="flex justify-start">
                    <button onClick={onRequestClose} className="p-1 focus:outline-none relative" style={{ top: '-15px', left: '-15px' }}>
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow"></div>
                <div className="flex justify-center mt-auto">
                    <button className="bg-gray-100 text-black py-2 px-4 mt-4">Добавить элемент</button>
                </div>
            </div>
        </div>
    );
};

export default SideModalComponent;
