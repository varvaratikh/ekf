// src/pages/MainPage.js
import React, { useState } from 'react';
import DropdownPicker from '../components/DropdownPicker';
import ColorLabelPicker from '../components/ColorLabelPicker';

const EditElement = () => {
    const [selectedName, setSelectedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const nameOptions = [
        { value: '', label: 'Select Name' },
        { value: 'name1', label: 'Каркас ВРУ-2 Unit S сварной IP31 (2000x800x450) EKF PROxima' },
        // Add more options here
    ];

    const categoryOptions = [
        { value: '', label: 'Select Category' },
        { value: '#FF8C00', label: 'Фаза A' },
        // Add more options here
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
            <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">название:</h2>
                    <DropdownPicker
                        options={nameOptions}
                        selectedOption={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">категория:</h2>
                    <ColorLabelPicker
                        options={categoryOptions}
                        selectedOption={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-4 mt-6">
                    <button className="bg-red-500 text-white py-2 px-4 rounded">Сохранить</button>
                    <button className="bg-gray-300 py-2 px-4 rounded">Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default EditElement;
