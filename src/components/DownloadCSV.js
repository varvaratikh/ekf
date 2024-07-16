import React from 'react';
import axios from 'axios';

const DownloadCSV = ({ mp }) => {

    const handleDownload = async () => {

        const formData = new FormData();
        formData.append('product', mp.name);

        try {
            const response = await axios.post('https://193.124.33.166:8094/users/csv', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            const blob = new Blob([response.data], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const file = document.createElement('a');
            file.href = downloadUrl;
            file.download = 'смета.csv';
            document.body.appendChild(file);
            file.click();
            file.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="text-center mt-8">
            <button
                type="button"
                className="py-2 px-16 bg-custom-red text-custom-wight font-bold"
                onClick={handleDownload}
            >
                Скачать .csv
            </button>
        </div>
    );
};

export default DownloadCSV;
