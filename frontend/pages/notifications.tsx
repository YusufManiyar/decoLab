import React, {useState} from "react";
import { NextPage } from "next";
import { NotifyItem, NotifyTabBar } from "@/components/notification";
import { Navbar } from "@/components/layouts";

const notifications: NotifyItem[] = [
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "normal", isCollaborated: true, isNormalUnread: true, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "normal", isCollaborated: true, isNormalUnread: true, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "normal", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "normal", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "normal", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "following", isCollaborated: false, isNormalUnread: false, isFollowUnread: true},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "following", isCollaborated: false, isNormalUnread: false, isFollowUnread: true},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "following", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "following", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "archived", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "archived", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "archived", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "archived", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
    {username: "Ralph Edwards", userAvatar: null, title: "wants to edit Tetrisly Design System", time: "5 min", type: "archived", isCollaborated: false, isNormalUnread: false, isFollowUnread: false},
];

const Notifications: NextPage = () => {
    const [isRead, setIsRead] = useState<boolean>(false);

    const handleIsRead = () => setIsRead(true);

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-row items-center gap-10 justify-between">
                <div className="basis-1/6">
                    <h1 className="font-poppins font-medium text-2xl text-right">NOTIFICATIONS</h1>
                </div>
                <div className="basis-5/6 text-right">
                    <button className="bg-white text-green-700 font-poppins font-light text-md" onClick={handleIsRead}>Mark all as read</button>
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-10">
                <Navbar />
                <NotifyTabBar items={notifications} isRead={isRead} />
            </div>
        </div>
    );
}

export default Notifications;