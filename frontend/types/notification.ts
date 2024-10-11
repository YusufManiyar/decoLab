import { User } from "@/store/slices/userSlice";

export type NotificationType = {
    notification: {
        _id: string;
        senderId: string;
        receiverId: string;
        type: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }
    sender: User
}