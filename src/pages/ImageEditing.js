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
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [canDraw, setCanDraw] = useState(false);

    const handelModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleMouseDown = (e) => {
        if (!canDraw) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPos({ x, y });
        setDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!drawing || !canDraw) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = x - startPos.x;
        const height = y - startPos.y;
        setCurrentBox({ x: startPos.x, y: startPos.y, width, height });
    };

    const handleMouseUp = () => {
        if (currentBox && canDraw) {
            const newBox = { x: startPos.x, y: startPos.y, width: currentBox.width, height: currentBox.height };
            setBoxes(prevBoxes => Array.isArray(prevBoxes) ? [...prevBoxes, newBox] : [newBox]);
            setMp(prevMp => Array.isArray(prevMp) ? [...prevMp, newBox] : [newBox]);
            setCurrentBox(null);
        }
        setDrawing(false);
        setCanDraw(false);
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
        boxes.forEach(box => {
            context.strokeStyle = 'black';
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
    }, [image]);

    useEffect(() => {
        if (imageRef.current && image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
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
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                draw();
            };
        }
    }, [image]);


    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-custom-black font-semibold text-lg">
            <div className="absolute top-1.5 right-0">
                <img
                    src={burger}
                    alt="Open Modal"
                    className="w-8 h-5 cursor-pointer"
                    onClick={handelModal}
                />
            </div>
            {image ? (
                <div className="w-4/6 flex flex-col items-center justify-center mt-8 mb-10 relative">
                    <img
                        ref={imageRef}
                        src={image}
                        alt="Uploaded file"
                        style={{ display: 'none' }}
                    />
                    <canvas
                        ref={canvasRef}
                        width={imageSize.width}
                        height={imageSize.height}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        style={{ border: '1px solid black' }}
                    />
                </div>
            ) : (
                <p>No image uploaded</p>
            )}
            {userId && response && (
                <div>
                    <p>User ID: {userId}</p>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            <DownloadCSV/>
            <SideModalComponent isOpen={isModalOpen} onRequestClose={handelModal} mp={mp} onAddElement={() => setCanDraw(true)} />
        </div>
    );
};

export default ImageEditing;

