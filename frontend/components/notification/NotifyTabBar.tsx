import React, { useEffect, useState } from "react";
import { NotifyItem, NotifyListGroup } from "./NotifyListGroup";

interface NotifyTabBarProps {
    items: NotifyItem[];
    isRead: boolean;
}

export const NotifyTabBar: React.FC<NotifyTabBarProps> = ({items, isRead}) => {
    
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const [followingItems, setFollowing] = useState<NotifyItem[]>([]);
    const [allItems, setAllItems] = useState<NotifyItem[]>([]);
    const [archivedItems, setArchivedItems] = useState<NotifyItem[]>([]);
    const [allUnreadCount, setAllUnreadCound] = useState<number>(0);
    const [followUnreadCount, setFollowUnreadCound] = useState<number>(0);

    const handleSelected = (key: string) => setSelectedTab(key);

    const handleListClick = (key: number, type: string) => {
        let updatedItems = allItems.map((item, index) => {
            debugger;
            if(index === key) {
                if(type === "following") {
                    item.isFollowUnread = false;
                } else if (type === "normal") {
                    item.isNormalUnread = false;
                }
            }
            return item;
        });
        updatedItems.sort((a, b) => {
            if (a.isFollowUnread && !b.isFollowUnread) {
                return -1;
            }
            if (!a.isFollowUnread && b.isFollowUnread) {
                return 1;
            }
            if (a.isNormalUnread && !b.isNormalUnread) {
                return -1;
            }
            if (!a.isNormalUnread && b.isNormalUnread) {
                return 1;
            }
            return 0;
        });
        setAllItems(updatedItems);
    }



    useEffect(() => {
        if(items.length > 0) {
            let followingItems: NotifyItem[] = [];
            let archivedItems: NotifyItem[] = [];
            let allItems: NotifyItem[] = [];
            let normalUnread: number = 0;
            let followUnreadCount: number = 0;

            for(const item of items) {
                if(item.type === "following") {
                    if(item.isFollowUnread) {
                        followUnreadCount++;
                    }
                    followingItems.push(item);
                }
                if(item.type === "archived") {
                    archivedItems.push(item);
                }
                if(item.isNormalUnread) {
                    normalUnread++;
                }
            }
            followingItems.sort((a, b) => {
                if (a.isFollowUnread && !b.isFollowUnread) {
                    return -1;
                }
                if (!a.isFollowUnread && b.isFollowUnread) {
                    return 1;
                }
                return 0; 
            });
            
            setFollowing(followingItems);

            allItems = items.sort((a, b) => {
                if (a.isFollowUnread && !b.isFollowUnread) {
                    return -1;
                }
                if (!a.isFollowUnread && b.isFollowUnread) {
                    return 1;
                }
                if (a.isNormalUnread && !b.isNormalUnread) {
                    return -1;
                }
                if (!a.isNormalUnread && b.isNormalUnread) {
                    return 1;
                }
                return 0;
            });

            setAllItems(allItems);
            setArchivedItems(archivedItems);
            setFollowUnreadCound(followUnreadCount);
            let allUnreadCount = followUnreadCount + normalUnread;
            setAllUnreadCound(allUnreadCount);
        }
    }, [items]);

    useEffect(() => {
        if(selectedTab === "all") {
            setAllUnreadCound(0);
        }
        if(selectedTab === "following") {
            setFollowUnreadCound(0);
        }
    }, [selectedTab]);

    useEffect(() => {
        if(isRead) {
            setAllUnreadCound(0);
            setFollowUnreadCound(0);
            let updatedAllItems = allItems.map((item) => {
                item.isFollowUnread = false;
                item.isNormalUnread = false;
                return item;
            });
            setAllItems(updatedAllItems);
        }
    }, [isRead]);

    return (
        <div className="border-dashboard rounded-md text-sm basis-5/6 font-medium text-center text-gray-500 border-b border-gray-200 ">
            <ul className="flex flex-wrap -mb-px">
                <li className="mr-1 flex items-center">
                    <button
                        className={`inline-block w-60 p-4 border-b-2 rounded-t-lg hover:text-green-600 ${selectedTab === "all" && "border-green-600 text-green-600"}
                            focus:border-green-600 focus:text-green-600 hover:border-green-600 text-lg font-poppins`}
                        onClick={() => handleSelected('all')}
                    >
                        All {allUnreadCount !== 0 && <span className="px-2 py-1 ml-2 bg-red-500 text-white font-poppins font-light text-sm" style={{borderRadius: "50%"}}>{allUnreadCount}</span>}
                    </button>
                </li>
                <li className="mr-1">
                    <button className={`inline-block w-60 p-4 border-b-2 border-transparent rounded-t-lg hover:text-green-600
                            hover:border-green-600 focus:border-green-600 focus:text-green-600 text-lg font-poppins`}
                        onClick={() => handleSelected('following')}
                    >
                        Following {followUnreadCount !== 0 && <span className="px-2 py-1 ml-2 bg-red-500 text-white font-poppins font-light text-sm" style={{borderRadius: "50%"}}>{followUnreadCount}</span>}
                    </button>
                </li>
                <li className="mr-1">
                    <button
                        className={`inline-block w-60 p-4 border-b-2 border-transparent rounded-t-lg hover:text-green-600
                            focus:border-green-600 focus:text-green-600 hover:border-green-600 text-lg font-poppins`}
                        onClick={() => handleSelected('archived')}
                    >
                        Archived
                    </button>
                </li>
            </ul>
            <NotifyListGroup items={selectedTab === "all" ? allItems : selectedTab === "following" ? followingItems : archivedItems} handleClick={handleListClick} />
        </div>
    );
}