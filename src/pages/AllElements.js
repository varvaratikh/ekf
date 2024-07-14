import React from 'react';
import Element from "../components/Element";

const AllElements = (isOpen) => {
    const items = [
        { color: 'orange', text: 'Каркас ВРУ-2 Unit S сварной IP31 (2000x800x450) EKF PROxima' },
        { color: 'green', text: 'Вертикальный профиль для ВРУ Unit S и R и ЩО-70 (2000xШхГ) EKF PROxima' },
        { color: 'lightblue', text: 'Плавкая вставка ППН-35 250/100А габарит 1 EKF' },
        { color: 'red', text: 'ШМГИ 3x32x1 EKF PROxima' },
        { color: 'purple', text: 'Реле промежуточное РП slim 22/2 5А 230В AC' }
    ];

    const handleClose = () => {
        // Add your logic here to close the popup window
        console.log("Close button clicked!");
    };
console.log(isOpen)
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
                            <button className="absolute bottom-0 mb-4 p-2 bg-gray-200 rounded">Добавить элемент</button>
                        </div>
                    </div>
                </div>
                :
                <div></div>


    );
};

export default AllElements;
