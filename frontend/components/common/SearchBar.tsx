import React, { ChangeEvent } from "react";
import {FaSearch} from "react-icons/fa";

interface SearchProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchProps> = ({value, onChange}) => {
    return (
        <div className="flex w-full border-dashboard p-2 rounded-md items-center justify-between">
            <input 
                type="text" 
                name="search" 
                placeholder="Search"
                className="w-[95%] outline-none border-none font-poppins font-light p-2"
                value={value}
                onChange={onChange}
            />
            <FaSearch size={25} className="text-gray-300 font-light text-right block" />
        </div>
    );
}