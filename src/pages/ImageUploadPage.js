import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploadPage = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Handle file upload here
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-custom-black">
            <div {...getRootProps({ className: 'dropzone' })} className={`w-4/6 h-1/2 border-2 border-dashed ${isDragActive ? 'border-custom-red' : 'border-custom-blue'} flex items-center justify-center mt-8 mb-20`}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Отпустите файл здесь...</p> :
                        <p>Выбрать файл</p>
                }
            </div>
            <button className="bg-custom-grey py-2 px-40">Отправить</button>
        </div>
    );
};

export default FileUploadPage;
