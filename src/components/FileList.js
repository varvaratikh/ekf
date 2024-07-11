import React from 'react';

const FileList = () => {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
            <h2 className="text-2xl mb-4">Файлы</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>06.07.2024</li>
                <li>03.07.2024</li>
                <li>27.06.2024</li>
            </ul>
        </div>
    );
};

export default FileList;
