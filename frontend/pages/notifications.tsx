import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { NotifyTabBar } from "@/components/notification";
import { Navbar } from "@/components/layouts";
import { Spinner } from "@/components/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAllNotifications } from "@/lib/api";
import { addUnreadAllNotificationCount, addUnreadCollaborationNotificationCount, setNotifications } from "@/store/slices/notificatonSlice";

const Notifications: NextPage = () => {
    const [isRead, setIsRead] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    const getAllNotifications = useCallback(async () => {
        try {
            const response = await fetchAllNotifications();
            console.log('notificationResponse:', response);
            if (response.ok) {
                console.log('ok');
                dispatch(setNotifications(response.notifications));
            } else {
                console.error("Failed to fetch notifications:", response);
            }
        } catch (err) {
            console.error("Server error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllNotifications();
        notifications.map(notify => {
            if(!notify.notification.isRead) {
                dispatch(addUnreadAllNotificationCount());
                if(notify.notification.type === "CollaborationRequest") {
                    dispatch(addUnreadCollaborationNotificationCount());
                }
            }
        });
    }, [getAllNotifications]);

    const handleIsRead = () => {
        setIsRead(true);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-row items-center gap-10 justify-between">
                <h1 className="font-poppins font-medium text-2xl text-right">NOTIFICATIONS</h1>
                <button className="bg-white text-green-700 font-poppins font-light text-md" onClick={handleIsRead}>
                    Mark all as read
                </button>
            </div>
            <div className="flex flex-row gap-10 mt-10">
                <Navbar />
                <NotifyTabBar items={notifications} isRead={isRead} />
            </div>
        </div>
    );
}

export default Notifications;
