import React from "react";

interface TagProps {
    key: string;
    name: string;
    onRemove: () => void;
}

export const TagBadge: React.FC<TagProps> = ({ key, name, onRemove }) => {
    return (
        <span key={key} className="flex items-center bg-blue-200 text-blue-800 text-xs rounded-md px-2 py-1 mr-2">
            {name}
            <button 
                onClick={onRemove} 
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                aria-label={`Remove ${name}`}
            >
                &times; {/* Close icon */}
            </button>
        </span>
    );
};
