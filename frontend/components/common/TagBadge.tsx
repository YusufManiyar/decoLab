import React from "react";

interface TagProps {
    key: string;
    name: string;
}

export const TagBadge: React.FC<TagProps> = ({ key, name }) => {
    return (
        <span key={key} className="tagbadge flex justify-center flex-col cursor-pointer hover:bg-blue-500 hover:text-white items-center bg-blue-200 text-blue-800 text-xs rounded-md px-[10px] py-[3px]">
            {name}
        </span>
    );
};

{/* <button 
                onClick={onRemove} 
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                aria-label={`Remove ${name}`}
            >
                &times; {/* Close icon */}
            // </button> */}
