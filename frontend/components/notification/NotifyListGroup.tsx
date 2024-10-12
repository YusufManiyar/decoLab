import React from "react";
import { NotificationType } from "@/types";

import {covertDateFromDBToRegularString} from "@/utils";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NotifyListGroupProps {
    items: NotificationType[];
    handleClick: (key: number, type: string) => void;
}

export const NotifyListGroup: React.FC<NotifyListGroupProps> = ({items, handleClick}) => {

    const {sendMessage} = useWebSocketContext();
    const {userData} = useSelector((state: RootState) => state.user);

    const handleAcceptClick = (item: NotificationType) => {
        try {
            sendMessage({type: "collaboration-accept", data: item.notification.collaborationId});
        } catch(err) {
            console.log("Server error:", err);
        }
    };

    const handleDenyClick = (item: NotificationType) => {
        try {
            sendMessage({type: "collaboration-deny", data: item.notification.collaborationId});
        } catch(err) {
            console.log("Server error:", err);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            {items.map((item, index) => (
                <div 
                    className={`flex flex-col p-4 notification-transition cursor-pointer rounded-lg mt-2 hover:bg-[#d3f8de] ${!item.notification.isRead ? "bg-[#d6d6d6]" : ""}`} 
                    key={index}
                    onClick={() => handleClick(index, item.notification.type)}
                >
                    <div className="flex flex-row items-start">
                        <span 
                            className="w-16 h-16 rounded-full bg-gray-300 bg-no-repeat bg-cover bg-center"
                            style={{backgroundImage: `url(${item.sender.profile.additionalInfo.logo})`}}
                        >
                        </span>
                        <div className="flex flex-col ml-6">
                            <h1 className="font-poppins text-md text-left font-bold">{item.sender.name}</h1>
                            <p className="font-poppins font-light text-md mt-2">{item.notification.message}</p>
                            <p className="font-poppins font-light text-sm text-left mt-2">{typeof item.notification.createdAt === "string" ? covertDateFromDBToRegularString(item.notification.createdAt) : ""}</p>
                            {(item.notification.type === "CollaborationRequest") && 
                                !item.notification.isReturened ? (
                                    (item.notification.status === "Accepted") ?
                                    <span className="font-poppins font-bold text-sm">
                                        {`You accepted ${item.sender.name}'s collaboration request`}
                                    </span>
                                    : item.notification.status === "Declined" ? 
                                    <span className="font-poppins font-bold text-sm">
                                        {`You declined ${item.sender.name}'s collaboration request`}
                                    </span>
                                    : <div className="flex mt-6">
                                        <button className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 mr-2 rounded-md" onClick={() => handleAcceptClick(item)}>Accept</button>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md" onClick={() => handleDenyClick(item)}>Deny</button>
                                    </div>
                                ) : (
                                <div className="flex mt-6">
                                    {item.notification.status === "Accepted" ? (
                                        <span className="font-poppins font-bold text-sm">
                                            {`${item.sender.name} accepted your collaboration request`}
                                        </span>
                                    ) : item.notification.status === "Declined" ? (
                                        <span className="font-poppins font-bold text-sm">
                                            {`${item.sender.name} declined your collaboration request`}
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}