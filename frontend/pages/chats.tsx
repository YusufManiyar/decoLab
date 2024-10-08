import React, { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import { Navbar } from "@/components/layouts";
import { ChatItemType, ChatItemGroup, ChatInput, ChatContactItemType, ChatContactGroup } from "@/components/chatroom";

const chatItems: ChatItemType[] = [
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    },
    {
        sender: {
            name: "Alex Joseph",
            avatar: null
        },
        text: "Hey, what are you doing now? you can let me know if you can start right now.",
        time: "11:25am",
        file: ""
    }
];

const chatContacts: ChatContactItemType[] = [
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
    {name: "Alex Joseph", avatar: null, text: "what is.."},
];

const Chats: NextPage = () => {
    const [chatText, setChatText] = useState<string>("");

    const handleChatInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setChatText(e.target.value);
    };

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-row gap-10">
                <div className="basis-1/6">
                    <h1 className="font-poppins font-medium text-4xl text-right">DeCollab</h1>
                </div>
                <div className="basis-2/3"></div>
                <div className="basis-1/6"></div>
            </div>
            <div className="flex flex-row mt-10 gap-10 flex-grow">
                <Navbar />
                <div className="basis-2/3 flex flex-col rounded-md p-10 border-dashboard h-[80vh]">
                    <div className="flex-grow overflow-y-auto">
                        <ChatItemGroup items={chatItems} />
                    </div>
                    <div className="sticky bottom-0 p-2">
                        <ChatInput 
                            value={chatText} 
                            file={""}
                            handleChange={handleChatInputChange} 
                        />
                    </div>
                </div>
                <div className="basis-1/6 flex flex-col rounded-md py-10 px-4 border-dashboard h-[80vh] overflow-auto">
                    <ChatContactGroup items={chatContacts} />
                </div>
            </div>
        </div>
    );
};

export default Chats;
