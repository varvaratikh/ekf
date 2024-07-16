import React from 'react';

const DownloadCSV = () => {
    return (
        <div className="text-center mt-8">
            <button type="button" className="py-2 px-16 bg-custom-red text-custom-wight font-bold ">
                Скачать .csv
            </button>
        </div>
    );
};

export default DownloadCSV;

// import React from 'react';
// import axios from 'axios';
//
// const DownloadCSV = () => {
//     const handleDownload = async () => {
//         const url = `https://193.124.33.166:8094/users/csv`;
//         const data = { info: {} };
//
//         console.log('Отправляем запрос на:', url);
//         console.log('С данными:', data);
//
//         try {
//             const response = await axios.post(url, data, {
//                 responseType: 'blob',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Access-Control-Allow-Origin': '*'
//                 }
//             });
//
//             if (response.status === 200) {
//                 const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
//                 const link = document.createElement('a');
//                 link.href = downloadUrl;
//                 link.setAttribute('download', 'users.csv');
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//             } else {
//                 console.error('Ошибка сервера:', response.statusText);
//             }
//         } catch (error) {
//             if (error.response) {
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                     const errorText = reader.result;
//                     console.error('Сообщение об ошибке от сервера:', errorText);
//                 };
//                 reader.readAsText(error.response.data);
//
//                 console.error('Код статуса:', error.response.status);
//                 console.error('Заголовки:', error.response.headers);
//             } else if (error.request) {
//                 console.error('Запрос был сделан, но ответа не получено', error.request);
//             } else {
//                 console.error('Ошибка:', error.message);
//             }
//             console.error('Конфигурация запроса:', error.config);
//         }
//     };
//
//
//     return (
//         <div className="text-center mt-8">
//             <button
//                 type="button"
//                 className="py-2 px-16 bg-custom-red text-custom-wight font-bold"
//                 onClick={handleDownload}
//             >
//                 Скачать .csv
//             </button>
//         </div>
//     );
// };
//
// export default DownloadCSV;
//

