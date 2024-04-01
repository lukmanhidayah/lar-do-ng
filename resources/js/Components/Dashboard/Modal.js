import React from "react";
import RootModal from "./RootModal";

export const Modal = ({ children, backdropClick, animation }) => {
    return (
        <RootModal>
            <div
                className={`modal-container ${animation}`}
                onClick={backdropClick}
            >
                {children}
            </div>
        </RootModal>
    );
};
