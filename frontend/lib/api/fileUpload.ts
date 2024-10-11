import axiosInstance from "../axiosInstance";

export const deleteTeamAvatar = async (filename: string) => {
    const response = await axiosInstance.delete(`/user/delete-team-avatar/${filename}`);
    return response.data;
} 