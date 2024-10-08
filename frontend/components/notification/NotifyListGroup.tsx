import React from "react";
import Image, {StaticImageData} from "next/image";

export type NotifyItem = {
    username: string;
    userAvatar: StaticImageData | null;
    title: string;
    type: string;
    time: string;
    isCollaborated: boolean;
    isNormalUnread: boolean;
    isFollowUnread: boolean;
}

interface NotifyListGroupProps {
    items: NotifyItem[];
    handleClick: (key: number, type: string) => void;
}

export const NotifyListGroup: React.FC<NotifyListGroupProps> = ({items, handleClick}) => {
    return (
        <div className="flex flex-col gap-5">
            {items.map((item, index) => (
                <div 
                    className={`flex flex-col p-4 notification-transition cursor-pointer rounded-lg mt-2 hover:bg-[#d3f8de] ${item.isNormalUnread || item.isFollowUnread ? "bg-[#d6d6d6]" : ""}`} 
                    key={index}
                    onClick={() => handleClick(index, item.type)}
                >
                    <div className="flex flex-row items-start">
                        <span className="w-16 h-16 rounded-full bg-gray-300">
                            {item.userAvatar && <Image src={item.userAvatar} alt={item.username} />}
                        </span>
                        <div className="flex flex-col ml-6">
                            <h1 className="font-poppins font-light text-md"><span className="font-bold">{item.username}</span> {item.title}</h1>
                            <p className="font-poppins font-light text-sm text-left mt-2">{item.time} ago</p>
                            {item.isCollaborated &&
                                <div className="flex mt-6">
                                    <button className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 mr-2 rounded-md">Accept</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md">Deny</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}