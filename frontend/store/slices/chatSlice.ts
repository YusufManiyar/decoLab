import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "@/types";

interface ChatState {
    chats: Chat[];
}

const initialState: ChatState = {
    chats: [],
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat(state, action: PayloadAction<Chat[]>) {
            state.chats = action.payload;
        },
        clearChat(state, action: PayloadAction<Chat[]>) {
            state.chats = [];
        },
    }
});

export const {setChat, clearChat} = chatSlice.actions;
export default chatSlice.reducer;