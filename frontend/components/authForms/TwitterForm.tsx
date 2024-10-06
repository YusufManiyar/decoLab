import React, { ChangeEvent, FormEvent } from "react";

interface TwitterProps {
    value: string;
    isTwitterValid: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
}

export const TwitterForm: React.FC<TwitterProps> = ({value, isTwitterValid, handleChange, handleSubmit}) => {
    return (
        <>
            <label className="text-black text-sm mb-1">Twitter Auth</label>
                <input 
                    type="twitter" 
                    name="twitter"
                    value={value}
                    className={`p-2 rounded-md outline-none ${isTwitterValid === true ? 'border-invalid' : 'border-primary'}`} 
                    onChange={handleChange}
                />
            {isTwitterValid === true ? <span className="text-red-500 text-sm mt-2">Please valid twitter username</span> : <></>}
            <button 
                className={`mt-5 bg-[#1E1E1E] block text-white rounded-md p-2 text-sm  ${isTwitterValid === true ? 'bg-gray-500' : 'hover:bg-black'}`}
                onClick={handleSubmit}
                disabled={isTwitterValid}
            >Next</button>
        </>
    );
}