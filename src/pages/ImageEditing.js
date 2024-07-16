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
    const [drawing, setDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentBox, setCurrentBox] = useState(null);
    const [isAddingBox, setIsAddingBox] = useState(false);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleMouseDown = (e) => {
        if (!isAddingBox) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPos({ x, y });
        setDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = x - startPos.x;
        const height = y - startPos.y;
        setCurrentBox({ x: startPos.x, y: startPos.y, width, height });
    };

    const handleMouseUp = () => {
        if (currentBox) {
            const newBox = {
                left: { x: startPos.x, y: startPos.y },
                right: { x: startPos.x + currentBox.width, y: startPos.y + currentBox.height }
            };
            setMp(prevMp => ({
                ...prevMp,
                boxes: [...prevMp.boxes, newBox],
                color: [...prevMp.color, 'red'],
                name: [...prevMp.name, `Box ${prevMp.boxes.length + 1}`]
            }));
            setCurrentBox(null);
            setIsAddingBox(false);
        }
        setDrawing(false);
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

        if (currentBox) {
            context.strokeStyle = 'black';
            context.strokeRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
        }
    };

    useEffect(() => {
        draw();
    }, [currentBox, mp]);

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

    const handleElementClick = (index) => {
        if (selectedBoxIndex === index) {
            setSelectedBoxIndex(null);
        } else {
            setSelectedBoxIndex(index);
        }
    };

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
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{ width: imageSize.width, height: imageSize.height }}
                />
            </div>

            <DownloadCSV mp={mp} />
            <SideModalComponent
                isOpen={isModalOpen}
                onRequestClose={handleModal}
                mp={mp}
                onElementClick={handleElementClick} // Pass the click handler
                selectedBoxIndex={selectedBoxIndex}
                onAddElement={() => setIsAddingBox(true)}
            />
        </div>
    );
};

export default ImageEditing;
