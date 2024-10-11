import React from "react";

interface TagProps {
    name: string;
}

export const TagBadge: React.FC<TagProps> = ({ name }) => {
    return (
        <span className={`tagbadge flex justify-center flex-col cursor-pointer text-xs rounded-md px-[10px] py-[3px] tag-border-${name.split("#")[1]}`}>
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
