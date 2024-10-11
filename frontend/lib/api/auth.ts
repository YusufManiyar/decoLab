import axiosInstance from "../axiosInstance";
import type { RegisterUser, EmailLoginUser } from "@/types";

export const register = async (user: RegisterUser) => {
    const response = await axiosInstance.post('/auth/register', user);
    return response.data;
}

export const emailLogin = async (user: EmailLoginUser) => {
    const response = await axiosInstance.post('/auth/email-login', user);
    return response.data;
}