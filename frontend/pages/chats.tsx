import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { Navbar } from "@/components/layouts";
import { ChatItemType, ChatItemGroup, ChatInput, ChatContactItemType, ChatContactGroup } from "@/components/chatroom";
import { Spinner } from "@/components/common";
import { fetchAllChats } from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { setChat } from "@/store/slices/chatSlice";
import { useWebSocket } from "@/hooks/useWebSocket";

const Chats: NextPage = () => {
    const [chatText, setChatText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();
    const {userData} = useSelector((state: RootState) => state.user);
    const {chats} = useSelector((state: RootState) => state.chat);
    const {sendMessage} = useWebSocket();

    const handleChatInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setChatText(e.target.value);
    };

    const getAllChats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchAllChats(userData?._id as string);
            if(response.ok) {
                dispatch(setChat(response.chats));
            }
        }catch(err) {
            console.log('Server error:', err);
        }finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllChats();
    }, []);

    const handleSend = () => {
        try {
            const newChat = {
                // senderId: 
            };
            sendMessage({type: "send-chat", data: newChat});
        }catch(err) {
            console.log("Server error:", err);
        }
    }

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-row gap-10">
                <div className="basis-1/6">
                    <h1 className="font-poppins font-medium text-4xl text-right">CHATS</h1>
                </div>
                <div className="basis-2/3"></div>
                <div className="basis-1/6"></div>
            </div>
            <div className="flex flex-row mt-10 gap-10 flex-grow">
                <Navbar />
                <div className="basis-2/3 flex flex-col rounded-md p-10 border-dashboard h-[80vh]">
                    <div className="flex-grow overflow-y-auto">
                        <ChatItemGroup items={chats} />
                    </div>
                    <div className="sticky bottom-0 p-2">
                        <ChatInput 
                            value={chatText} 
                            file={""}
                            handleChange={handleChatInputChange}
                            handleSend={handleSend}
                        />
                    </div>
                </div>
                <div className="basis-1/6 flex flex-col rounded-md py-10 px-4 border-dashboard h-[80vh] overflow-auto">
                    {/* <ChatContactGroup items={chatContacts} /> */}
                </div>
            </div>
        </div>
    );
};

export default Chats;
