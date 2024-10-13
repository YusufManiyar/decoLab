import { StaticImageData } from "next/image";
export type {NewPostType} from "./post";
export type {CollaborationPendingType} from "./collaboration";
export type {NotificationType} from "./notification";
export type {Chat} from "./chat";

export type Avatar = {
    src: StaticImageData,
    alt: string;
}

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
    profile: {
        websiteUrl: string;
        industry: string[];
        socialLinks: {
            twitterHandle: string;
            telegram: string;
            github: string;
        }
    }
}

export type EmailLoginUser = {
    email: string;
    password: string;
}