import React, { useState } from 'react';

const SideModalOneComponent = ({ isOpen, onRequestClose }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [title, setTitle] = useState('Каркас BPY-2 Unit S сварной IP31 (2000x800x450) EKF PROxima');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    return (
        <div className={`fixed top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-lg transition-transform duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '278px', margin: `0 ${isOpen ? '20px' : '0'}`, padding: '20px' }}>
            <div className="flex flex-col h-full">
                <div className="mt-4">
                    <h3 className="text-custom-black font-bold">название:</h3>
                    <input
                        className="mt-2 border border-gray-300 rounded p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <h3 className="text-custom-black font-bold">категория:</h3>
                    <div className="mt-2 border border-gray-300 rounded p-2 relative">
                        <div
                            className="p-2 cursor-pointer bg-custom-wight"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {selectedCategory || 'Выберите категорию'}
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-10">
                                {['Фаза A', 'Фаза B', 'Фаза C'].map((category) => (
                                    <div
                                        key={category}
                                        className={`p-2 cursor-pointer ${selectedCategory === category ? 'bg-custom-grey' : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-auto flex flex-col items-center">
                    <button className="bg-custom-red text-custom-wight py-2 px-4 mt-4 w-full">Сохранить</button>
                    <button className="bg-custom-grey text-custom-black py-2 px-4 mt-2 w-full">Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default SideModalOneComponent;
