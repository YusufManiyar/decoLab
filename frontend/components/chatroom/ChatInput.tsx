import React, { ChangeEvent } from "react";
import {FaPaperclip } from "react-icons/fa";
import {MdSend} from "react-icons/md";

const styles = {
    container: "flex gap-5 items-center justify-between sticky bottom-0",
    fileButton: ""
}

interface ChatInputProps {
    value: string;
    file: string | null;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({value, file, handleChange, handleSend}) => {
    
    return (
        <div className={styles.container}>
            <div className="relative group cursor-pointer">
                <input type="file" className="opacity-0 cursor-pointer w-7 absolute" />
                <button className="w-8 h-8 rounded-full group-hover:bg-gray-400 notification-transition  border-primary cursor-pointer flex items-center justify-center">
                    <FaPaperclip className="w-4 h-4 group-hover:text-black notification-transition text-gray-500 " />
                </button>
            </div>
            <textarea
                name="chat"
                value={value}
                className="border-primary w-full rounded-md text-black outline-none h-10 p-2 font-poppins font-extralight text-sm overflow-hidden"
                style={{ resize: "none", minHeight: "auto", maxHeight: "50px" }}
                onChange={handleChange}
            />
            <div className="flex">
                <button 
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-green-600 cursor-pointer hover:bg-green-700 notification-transition"
                    onClick={handleSend}
                >
                    <MdSend className="w-5 h-5 text-white" />
                </button>
            </div>
            
        </div>
    );
}