import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DownloadCSV from "../components/DownloadCSV";
import SideModalComponent from '../components/SideModalComponent';
import burger from '../images/Burger.png';

const ImageEditing = () => {
    const location = useLocation();
    const { image, userId, response } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mp, setMp] = useState(response || []);
    const [boxes, setBoxes] = useState(response?.boxes || []);
    const [drawing, setDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentBox, setCurrentBox] = useState(null);
    const [isAddingBox, setIsAddingBox] = useState(false);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handelModal = () => {
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
            const newBox = { x: startPos.x, y: startPos.y, width: currentBox.width, height: currentBox.height };
            setBoxes(prevBoxes => [...prevBoxes, newBox]);
            setMp(prevMp => [...prevMp, newBox]);
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
        boxes.forEach((box, index) => {
            context.strokeStyle = response.color[index] || 'black';
            context.strokeRect(box.x, box.y, box.width, box.height);
        });
        if (currentBox) {
            context.strokeStyle = 'black';
            context.strokeRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
        }
    };

    useEffect(() => {
        draw();
    }, [image, boxes, currentBox]);

    useEffect(() => {
        const handleResize = () => {
            if (imageRef.current) {
                const canvas = canvasRef.current;
                const { naturalWidth, naturalHeight } = imageRef.current;
                const aspectRatio = naturalWidth / naturalHeight;
                const maxWidth = window.innerWidth * 0.65;
                const maxHeight = window.innerHeight * 0.65;
                let width = maxWidth;
                let height = maxHeight;

                if (maxWidth / maxHeight > aspectRatio) {
                    width = maxHeight * aspectRatio;
                } else {
                    height = maxWidth / aspectRatio;
                }

                setImageSize({ width, height });
                canvas.width = width;
                canvas.height = height;
                draw();
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-white">
            <div className="absolute top-2 right-1">
                <img
                    src={burger}
                    alt="Open Modal"
                    className="w-8 h-5 cursor-pointer"
                    onClick={handelModal}
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
                onRequestClose={handelModal}
                mp={mp}
                selectedBox={null}
                onBoxUpdate={null}
                onBoxDelete={null}
                onAddElement={() => {
                    setIsAddingBox(true);
                }}
            />
        </div>
    );
};

export default ImageEditing;
