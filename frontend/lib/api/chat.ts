import axiosInstance from "../axiosInstance";

export const fetchAllChats = async (id: string) => {
    const response = await axiosInstance.get(`/chat/all/${id}`);
    return response.data;
}