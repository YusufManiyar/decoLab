import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    toChange: boolean;
    onSave: () => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, toChange, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-700 text-lg hover:text-black">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button onClick={onClose} className="bg-gray-300 transition-colors duration-200 text-black px-4 py-2 rounded hover:bg-gray-400">
                        Close
                    </button>
                    {toChange && (
                        <button onClick={onSave} className="bg-green-600 transition-colors duration-200 ml-6 text-white px-4 py-2 rounded hover:bg-green-700">
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;