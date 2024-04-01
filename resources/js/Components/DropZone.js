import React, { useState } from "react";

const DropZone = ({ children, onDrop, name, className }) => {
    const [isOver, setIsOver] = useState(false);
    const dragOver = (e) => {
        e.preventDefault();
        setIsOver(true);
    };

    const dragEnter = (e) => {
        e.preventDefault();
        setIsOver(false);
    };

    const dragLeave = (e) => {
        e.preventDefault();
        setIsOver(false);
    };

    const fileDrop = (e) => {
        e.preventDefault();
        setIsOver(false);
        const files = e.dataTransfer.files[0];
        if (validateFile(files)) {
            const callback = {
                target: {
                    name: name,
                    files: e.dataTransfer.files,
                },
            };
            onDrop(callback);
        }
    };

    const validateFile = (file) => {
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    };

    return (
        <div
            className={`flex flex-col justify-center items-center ${
                isOver ? "bg-blue-100" : ""
            } w-full h-full ${className}`}
            onDrop={fileDrop}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
        >
            {children}
        </div>
    );
};

export default DropZone;
