import React from "react";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

export type ChatContactItemType = {
    name: string;
    avatar: StaticImageData | null;
    text: string;
}

interface ChatContactGroupProps {
    items: ChatContactItemType[];
}

export const ChatContactGroup: React.FC<ChatContactGroupProps> = ({items}) => {
    return (
        <>
            {items.map((item, index) => (
                <Link href="" className="cursor-pointer hover:bg-[#c3facc] rounded-lg px-2 py-4 notification-transition">
                    <div className="flex items-center" key={index}>
                        <span className="w-10 h-10 rounded-full bg-gray-400">
                            {item.avatar && <Image src={item.avatar} alt={item.name} />}
                        </span>
                        <div className="flex flex-col ml-2">
                            <h1 className="font-poppins font-light text-sm">{item.name}</h1>
                            <span className="ml-2 font-poppins font-light text-xs">{item.text}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}