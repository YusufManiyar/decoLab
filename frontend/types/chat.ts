import { User } from "@/store/slices/userSlice";

export type Chat = {
    sender: User;
    receiver: User;
    message: string;
    files: string[];
    createdAt: Date;
}