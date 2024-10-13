import {PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tempReducer from "./slices/tempSlice";
import companyReducer from "./slices/companySlice";
import postReducer from "./slices/postSlice";
import notificationReducer from "./slices/notificatonSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        temp: tempReducer,
        company: companyReducer,
        post: postReducer,
        notification: notificationReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;