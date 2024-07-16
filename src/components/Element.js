import React from 'react';

const Element = ({ items }) => {
    return (
        <div className="flex flex-col">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`flex items-center p-4 my-2 rounded cursor-pointer border border-gray-300`}
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
