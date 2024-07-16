import React from 'react';

const Element = ({ items, onElementClick, selectedBoxIndex }) => {
    return (
        <div className="flex flex-col">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onElementClick(item.index)}
                    className={`flex items-center p-4 my-2 rounded cursor-pointer border ${selectedBoxIndex === item.index ? 'border-black' : 'border-gray-300'}`}
                >
                    <div
                        className="w-6 h-6 mr-2"
                        style={{ backgroundColor: item.color }} // Use the color from item
                    />
                    <div className="flex-1">
                        {item.text}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Element;
