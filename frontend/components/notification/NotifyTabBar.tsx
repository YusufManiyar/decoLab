import React, { useEffect, useState } from "react";
import { NotificationType } from "@/types";
import { NotifyListGroup } from "./NotifyListGroup";
import { useDispatch } from "react-redux";
import { setAllNotificationRead, setCollaborationRead, setUnreadAllCount, setUnreadCollaborationCount } from "@/store/slices/notificatonSlice";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { allNotificationRead, collaborationNotificationRead } from "@/lib/api";

interface NotifyTabBarProps {
    items: NotificationType[];
    isRead: boolean;
}

export const NotifyTabBar: React.FC<NotifyTabBarProps> = ({items, isRead}) => {
    
    const [selectedTab, setSelectedTab] = useState<string>("All");
    const [collaborationItems, setCollaborationItems] = useState<NotificationType[]>([]);
    const [allItems, setAllItems] = useState<NotificationType[]>([]);
    const [allUnreadCount, setAllUnreadCount] = useState<number>(0);
    const [collaborationUnreadCount, setCollaborationUnreadCount] = useState<number>(0);
    const {sendMessage} = useWebSocketContext();

    const handleSelected = (key: string) => setSelectedTab(key);

    const dispatch = useDispatch();

    const handleListClick = (key: number, type: string) => {
        // let updatedItems = allItems.map((item, index) => {
        //     if(index === key) {
        //         if(type === "NewMessage") {
        //             item.isCollaborated = false;
        //         } else if (type === "normal") {
        //             item.isNormalUnread = false;
        //         }
        //     }
        //     return item;
        // });
        // updatedItems.sort((a, b) => {
        //     if (a.isFollowUnread && !b.isFollowUnread) {
        //         return -1;
        //     }
        //     if (!a.isFollowUnread && b.isFollowUnread) {
        //         return 1;
        //     }
        //     if (a.isNormalUnread && !b.isNormalUnread) {
        //         return -1;
        //     }
        //     if (!a.isNormalUnread && b.isNormalUnread) {
        //         return 1;
        //     }
        //     return 0;
        // });
        // setAllItems(updatedItems);
    }



    useEffect(() => {
        console.log("notificationItems: ", items);
        if(items && items.length > 0) {
            let allItems: NotificationType[] = [];
            let collaborationItems: NotificationType[] = [];
            let allUnreadCount = 0;
            let collaborationUnreadCount = 0;
            console.log(items);
            items.map(item => {
                if(!item.notification.isRead) {
                    allUnreadCount++;
                    if(item.notification.type === "CollaborationRequest" && !item.notification.isRead) {
                        collaborationUnreadCount++;
                    }
                }
                if(item.notification.type === "CollaborationRequest") {
                    collaborationItems.push(item);
                }
                allItems.push(item);
            });

            setAllItems(allItems);
            setCollaborationItems(collaborationItems);
            setAllUnreadCount(allUnreadCount);
            setCollaborationUnreadCount(collaborationUnreadCount);
        }
    }, [items]);

    useEffect(() => {
        if(selectedTab === "All") {
            const allRead = async () => {
                try {
                    const response = await allNotificationRead();
                    if(response.ok) {
                        setAllUnreadCount(0);
                        dispatch(setUnreadAllCount(0));
                        dispatch(setAllNotificationRead());
                    }
                }catch(err) {
                    console.log("Server error", err);
                }
            };
            allRead();
        }
        if(selectedTab === "CollaborationRequest") {
            const collaborationRead = async () => {
                try {
                    const response = await collaborationNotificationRead();
                    if(response.ok) {
                        setCollaborationUnreadCount(0);
                        dispatch(setUnreadCollaborationCount(0));
                        dispatch(setCollaborationRead());
                    }
                } catch(err) {
                    console.log("Server error:", err);
                }
            };
            collaborationRead();
        }

    }, [selectedTab]);

    useEffect(() => {
        if(isRead) {
            setAllUnreadCount(0);
            setCollaborationUnreadCount(0);
            let updatedAllItems = allItems.map((item) => {
                item.notification.isRead = true;
                return item;
            });
            dispatch(setUnreadAllCount(0));
            setAllItems(updatedAllItems);
        }
    }, [isRead]);

    return (
        <div className="border-dashboard rounded-md p-2 text-sm basis-5/6 font-medium text-center text-gray-500 border-b border-gray-200 overflow-auto">
            <ul className="flex flex-rows sticky top-0">
                <li className="mr-1 flex items-center basis-1/3 justify-center">
                    <button
                        className={`w-full flex justify-center items-center py-5 border-b-2 rounded-t-lg hover:text-green-600 ${selectedTab === "All" && "border-green-600 text-green-600"}
                            focus:border-green-600 focus:text-green-600 hover:border-green-600 text-lg font-poppins`}
                        onClick={() => handleSelected('All')}
                    >
                        All {allUnreadCount !== 0 && <span className="w-8 h-8 flex items-center justify-center ml-3 bg-red-500 text-white font-poppins font-light text-sm" style={{borderRadius: "50%"}}>{allUnreadCount}</span>}
                    </button>
                </li>
                <li className="mr-1 basis-1/3 flex items-center justify-center">
                    <button className={`flex justify-center items-center w-full py-5 border-b-2 border-transparent rounded-t-lg hover:text-green-600
                            hover:border-green-600 focus:border-green-600 focus:text-green-600 text-lg font-poppins`}
                        onClick={() => handleSelected('CollaborationRequest')}
                    >
                        Collaboration {collaborationUnreadCount !== 0 && <span className="w-8 h-8 flex items-center justify-center ml-2 bg-red-500 text-white font-poppins font-light text-sm" style={{borderRadius: "50%"}}>{collaborationUnreadCount}</span>}
                    </button>
                </li>
            </ul>
            <NotifyListGroup items={selectedTab === "All" ? allItems : selectedTab === "CollaborationRequest" ? collaborationItems : []} handleClick={handleListClick} />
        </div>
    );
}