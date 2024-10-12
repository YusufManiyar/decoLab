import axiosInstance from "../axiosInstance";

export const fetchAllNotifications = async (id: string) => {
    const response = await axiosInstance.get(`/notification/all/${id}`);
    return response.data;
}

export const allNotificationRead = async () => {
    const response = await axiosInstance.patch('/notification/all-read');
    return response.data;
}

export const collaborationNotificationRead = async () => {
    const response = await axiosInstance.patch('/notification/collaboration-read');
    return response.data;
}