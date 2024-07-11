import React from 'react';

const PredictionForm = () => {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
            <h2 className="text-2xl mb-4">Прогнозирования коммерческого предложения</h2>
            <form className="space-y-4">
                <label className="block">
                    <span className="block text-gray-700">Название:</span>
                    <input type="text" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </label>
                <label className="block">
                    <span className="block text-gray-700">Категория:</span>
                    <input type="text" name="category" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </label>
                <div className="flex space-x-4">
                    <button type="submit" className="w-1/2 py-2 bg-blue-600 text-white rounded-md">Сохранить</button>
                    <button type="button" className="w-1/2 py-2 bg-red-600 text-white rounded-md">Удалить</button>
                </div>
            </form>
        </div>
    );
};

export default PredictionForm;
