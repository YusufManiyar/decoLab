import React from "react";
import Image, { StaticImageData } from "next/image";

export type ChatItemType = {
    sender: {
        name: string;
        avatar: StaticImageData | null;
    },
    text: string;
    time: string;
    file: string;
}

interface ChatItemGroupProps {
    items: ChatItemType[];
}

const styles = {
    container: "flex flex-col border-dashboard p-4 rounded-lg bg-gray-200 mb-6",
    header: "flex flex-row items-center",
    avatar: "w-10 h-10 rounded-full bg-gray-400"
}

export const ChatItemGroup: React.FC<ChatItemGroupProps> = ({items}) => {
    return (
        <>
         {items.map((item, index) => (
            <div className={styles.container} key={index}>
                <div className={styles.header}>
                    <span className={styles.avatar}>
                        {item.sender.avatar && <Image src={item.sender.avatar} alt={item.sender.name} />}
                    </span>
                    <h1 className="font-poppins font-light text-sm ml-5">{item.sender.name}</h1>
                    <span className="font-poppins font-extralight text-xs ml-2">{item.time}</span>
                </div>
                <div className="flex flex-col ml-12">
                    <div className="p-4"><span className="font-poppins font-extralight text-sm">{item.text}</span></div>
                    <div></div>
                </div>
            </div>
         ))}
        </>
    );
}