import React, { useEffect } from "react";
import {MdShare} from "react-icons/md";
import { TagBadge } from "../common";
import { covertDateFromDBToRegularString } from "@/utils";
import { CollaborationPendingType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import { useWebSocketContext } from "@/context/WebSocketContext";

export type PostItem = {
    _id: string;
    companyId: string;
    companyName: string;
    companyAvatar: string;
    followers: string;
    views: string;
    content: string;
    tags: string[];
    timeFrame: string;
    timeUnit: string;
    isClosed: boolean;
    isRequested: boolean;
    createdAt: string;
}

interface PostGroupProps {
    items: PostItem[];
}

export const PostGroup: React.FC<PostGroupProps> = ({items}) => {
    
    const {sendMessage} = useWebSocketContext();

    const {userData} = useSelector((state: RootState) => state.user);

    const handleCollaborationRequest = async (item: PostItem) => {
        try{
            const collaborationPending: CollaborationPendingType = {
                receiverId: item.companyId,
                postId: item._id,
                type: "AMA",
                message: "",
                status: "Pending",
                createdAt: new Date(),
            }
            sendMessage({type: "collaborate-pending", data: collaborationPending});
            toast.success("Sent collaboration request successfully");
        }catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col gap-10">
            {items && items.map((item, index) => (
                <div className="flex flex-col border-dashboard rounded-md p-4" key={index}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between">
                            <span 
                                className="flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center w-16 h-16 rounded-full"
                                style={{backgroundImage: `url(${item.companyAvatar})`}}    
                            >
                            </span>
                            <div className="flex flex-col ml-4">
                                <h1 className="font-poppins font-light text-2xl">{item.companyName}</h1>
                                <p className="font-poppins font-light text-lg">{item.followers} followers</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-poppins font-thin text-xl text-gray-500 mr-4">{item.views} views</h1>
                            <MdShare size={50} className="text-green-700 cursor-pointer hover:text-green-900 transition-colors duration-200" />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 mt-4">
                        <p className="font-poppins font-light text-xl leading-8">{item.content}</p>
                    </div>
                    <div className="flex mt-2 p-2 justify-between items-center">
                        <div className="flex">
                            {item.tags.map((tag, index) => (
                                <span className="mr-2" key={index}><TagBadge name={tag} /></span>
                            ))}
                        </div>
                        <div className="flex">
                            {covertDateFromDBToRegularString(item.createdAt)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-poppins font-light text-lg text-gray-500">Time Frame - {item.timeFrame} {item.timeUnit}</span>
                        <span className="font-poppins font-light text-lg text-gray-500">Companies Reached Out - 20</span>
                    </div>
                    {userData && (userData._id === item.companyId )
                        ? <></>
                        : <button 
                            className={`flex flex-col items-center justify-center w-full py-4 font-poppins font-light rounded-md mt-4 
                                ${item.isClosed || item.isRequested ? 'bg-[#D8D8D8] text-gray-500' : 'bg-green-700 text-white hover:bg-green-900'}`}
                            disabled={item.isClosed}
                            onClick={() => handleCollaborationRequest(item)}
                        >
                            {item.isClosed ? "Successfully Closed by PrimeXBT" : item.isRequested ? "Sent collaboration request" : "Send Collaboration Request"}
                        </button>

                    }
                </div>
            ))}
        </div>
    );
}