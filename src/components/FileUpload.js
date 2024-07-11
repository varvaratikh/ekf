import React from 'react';

const FileUpload = () => {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
            <h2 className="text-2xl mb-4">Выбрать файл</h2>
            <input type="file" className="block w-full text-gray-700 mt-2" />
            <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md">Отправить</button>
        </div>
    );
};

export default FileUpload;
