import React from 'react';

const DropdownPicker = ({ label, options, onChange, selectedOption }) => {
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
        </div>
    );
};

export default DropdownPicker;
