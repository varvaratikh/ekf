import React, { useState } from 'react';

const Element = ({ items }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleClick = (item) => {
        const selectedIndex = selectedItems.findIndex(selectedItem => selectedItem.text === item.text);

        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedItems = [...selectedItems];
            updatedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedItems);
        }
    };

    const isSelected = (item) => {
        return selectedItems.some(selectedItem => selectedItem.text === item.text);
    };

    return (
        <div className="flex flex-col">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`flex items-center p-4 my-2 rounded cursor-pointer border ${isSelected(item) ? 'border-black' : 'border-gray-300'}`}
                >
                    <div
                        className="w-6 h-6 mr-2"
                        style={{ backgroundColor: item.color }}
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
