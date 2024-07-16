import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DownloadCSV from "../components/DownloadCSV";
import SideModalComponent from '../components/SideModalComponent';
import burger from '../images/Burger.png';

const ImageEditing = () => {
    const location = useLocation();
    const { image, userId, response } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mp, setMp] = useState(response || { boxes: [], color: [], name: [] });
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
        clearCanvas();
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (imageRef.current) {
            context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        }

        // Calculate the scaling factors
        const { naturalWidth, naturalHeight } = imageRef.current;
        const scaleX = canvas.width / naturalWidth;
        const scaleY = canvas.height / naturalHeight;

        mp.boxes.forEach((box, index) => {
            context.strokeStyle = mp.color[index] || 'red';
            context.strokeRect(
                box.left.x * scaleX,
                box.left.y * scaleY,
                (box.right.x - box.left.x) * scaleX,
                (box.right.y - box.left.y) * scaleY
            );
        });
    };

    useEffect(() => {
        draw();
    }, [mp]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Ensure imageRef.current is properly referenced
        const { naturalWidth, naturalHeight } = imageRef.current;
        const aspectRatio = naturalWidth / naturalHeight;

        // Calculate maximum dimensions based on window size
        const maxWidth = window.innerWidth * 0.65;
        const maxHeight = window.innerHeight * 0.65;
        let width = maxWidth;
        let height = maxHeight;

        // Adjust width or height to maintain aspect ratio
        if (maxWidth / maxHeight > aspectRatio) {
            width = maxHeight * aspectRatio;
        } else {
            height = maxWidth / aspectRatio;
        }

        // Set canvas size
        setImageSize({ width, height });
        canvas.width = width;
        canvas.height = height;

        // Draw the image
        context.drawImage(imageRef.current, 0, 0, width, height);

        // Calculate the scaling factors
        const scaleX = width / naturalWidth;
        const scaleY = height / naturalHeight;

        // Draw other boxes on top of the image
        mp.boxes.forEach((box, index) => {
            context.strokeStyle = mp.color[index] || 'red';
            context.strokeRect(
                box.left.x * scaleX,
                box.left.y * scaleY,
                (box.right.x - box.left.x) * scaleX,
                (box.right.y - box.left.y) * scaleY
            );
        });
    }, []);

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-white">
            <div className="absolute top-2 right-1">
                <img
                    src={burger}
                    alt="Open Modal"
                    className="w-8 h-5 cursor-pointer"
                    onClick={handleModal}
                />
            </div>
            <div className="relative">
                <img
                    ref={imageRef}
                    src={image}
                    alt="Image to edit"
                    className="hidden"
                />
                <canvas
                    ref={canvasRef}
                    className="border-2 border-black"
                    style={{ width: imageSize.width, height: imageSize.height }}
                />
            </div>

            <DownloadCSV mp={mp} />
            <SideModalComponent
                isOpen={isModalOpen}
                onRequestClose={handleModal}
                mp={mp}
            />
        </div>
    );
};

export default ImageEditing;
