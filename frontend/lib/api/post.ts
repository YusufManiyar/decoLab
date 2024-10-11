import axiosInstance from "../axiosInstance";
import { NewPostType } from "@/types";

export const addNewPost = async (newPost: NewPostType) => {
    const response = await axiosInstance.post('/post/add', newPost);
    return response.data;
}

export const getAllPosts = async () => {
    const response = await axiosInstance.get('/post/all');
    return response.data;
}