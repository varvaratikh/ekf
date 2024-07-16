import React from 'react';
import Element from '../components/Element';

const SideModalComponent = ({ isOpen, onRequestClose, mp }) => {
    const items = mp ? mp.boxes.map((box, index) => ({
        color: mp.color[index] || 'red',
        text: mp.name[index] || `Box ${index + 1}`,
    })) : [];

    return (
        <div className={`fixed top-10 right-0 bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '278px', height: '700px', margin: `10px ${isOpen ? '20px' : '0'}`, overflowY: 'auto' }}>
            <div className="flex flex-col h-full p-8">
                <div className="flex justify-start">
                    <button onClick={onRequestClose} className="p-1 focus:outline-none relative" style={{ top: '-15px', left: '-15px' }}>
                        <svg className="h-6 w-6 text-custom-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <Element items={items} />
                </div>
            </div>
        </div>
    );
};

export default SideModalComponent;
