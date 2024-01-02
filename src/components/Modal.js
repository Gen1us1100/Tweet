import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="modal">
            {children}
        </div>
    );
};

export default Modal;
