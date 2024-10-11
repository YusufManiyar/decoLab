import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "@/types";

interface NotificationStateType {
    notifications: NotificationType[];
    unreadAllCount: number;
    unreadCollaborationCount: number;
}

const initialState: NotificationStateType = {
    notifications: [],
    unreadAllCount: 0,
    unreadCollaborationCount: 0,
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications(state, action: PayloadAction<NotificationType[]>){
            state.notifications = action.payload;
        },
        clearNotifications (state) {
            state.notifications = [];
        },
        pushNotification (state, action: PayloadAction<NotificationType>) {
            state.notifications = [
                ...state.notifications,
                action.payload
            ];
        },
        updateIsReadNotification (state, action: PayloadAction<string>) {
            const index = state.notifications.findIndex(noti => noti.notification._id === action.payload);
            if(index !== -1) {
                state.notifications[index].notification.isRead = true;
            }
        },
        setAllNotificationRead (state) {
            state.notifications = state.notifications.map(notify => ({...notify, notification: {...notify.notification, isRead: true}}));
        },
        setCollaborationRead(state) {
            state.notifications = state.notifications.map((notify) => {
                if (notify.notification.type === "CollaborationRequest") {
                    return {
                        ...notify,
                        notification: {
                            ...notify.notification,
                            isRead: true
                        }
                    };
                }
                return notify;
            });
        },
        setUnreadAllCount(state, action: PayloadAction<number>) {
            state.unreadAllCount = action.payload;
        },
        setUnreadCollaborationCount(state, action: PayloadAction<number>) {
            state.unreadCollaborationCount = action.payload;  
        },
        addUnreadAllNotificationCount(state) {
            state.unreadAllCount ++;
        },
        addUnreadCollaborationNotificationCount(state) {
            state.unreadCollaborationCount++;
        }
    }
});

export const {setNotifications, clearNotifications, setAllNotificationRead, setCollaborationRead, pushNotification, setUnreadAllCount, setUnreadCollaborationCount, addUnreadAllNotificationCount, addUnreadCollaborationNotificationCount} = notificationSlice.actions;
export default notificationSlice.reducer;