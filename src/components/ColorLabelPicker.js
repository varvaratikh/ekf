import React from 'react';

const ColorLabelPicker = ({ label, options, onChange, selectedOption }) => {
    const selectedOptionData = options.find(option => option.value === selectedOption);

    return (
        <div className="my-2">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={onChange}
                value={selectedOption}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {selectedOptionData && (
                <div className="flex items-center mt-2">
                    <span
                        className={`inline-block w-3 h-3 rounded-full mr-2`}
                        style={{ backgroundColor: selectedOptionData.value }}
                    ></span>
                    <span>{selectedOptionData.label}</span>
                </div>
            )}
        </div>
    );
};

export default ColorLabelPicker;
