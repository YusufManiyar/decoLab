import { createSlice,  PayloadAction} from "@reduxjs/toolkit";
import { User } from "./userSlice";

interface TempState {
    fileUrl: string | null;
    otherUser: User | null;
}

const initialState: TempState = {
    fileUrl: null,
    otherUser: null,
}

const tempSlice = createSlice({
    name: "temp",
    initialState,
    reducers: {
        setTemp(state, action: PayloadAction<TempState>) {
            state = action.payload
        },
        clearTemp(state) {
            state = initialState;
        },
        setFileUrl(state, action: PayloadAction<string>) {
            state.fileUrl = action.payload;
        },
        clearFileUrl(state) {
            state.fileUrl = null;
        },
        setOtherUser(state, action: PayloadAction<User>) {
            state.otherUser = action.payload;
        },
        clearOtherUser(state) {
            state.otherUser = null;
        }
    }
});

export const {setTemp, clearTemp, setFileUrl, clearFileUrl, setOtherUser, clearOtherUser} = tempSlice.actions;
export default tempSlice.reducer;