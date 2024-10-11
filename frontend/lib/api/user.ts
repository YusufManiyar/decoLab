import { TeamMember, User } from "@/store/slices/userSlice";
import axiosInstance from "../axiosInstance";

export const fetchUserById = async (id: string) => {
    const response = await axiosInstance.get(`/user/others/${id}`);
    return response.data;
};

export const fetchCompanyList = async () => {
    const response = await axiosInstance.get('/user/list');
    return response.data;
}

export const fetchMe = async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
};

export const updateMe = async (updatedUser: User) => {
    const response = await axiosInstance.patch('/user/me', updatedUser);
    return response.data;
};

export const addTeamMember = async (teamMember: TeamMember) => {
    const response = await axiosInstance.post('/user/me/team-member', teamMember);
    return response.data;
};

export const deleteAvatar = async (filename: string) => {
    const response = await axiosInstance.delete(`/user/delete-avatar/${filename}`);
    return response.data;
};