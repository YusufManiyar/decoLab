import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostItem } from "@/components/collaborationPost";

interface PostSliceState {
    posts: PostItem[];
}

const initialState: PostSliceState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost(state, action: PayloadAction<PostItem[]>) {
            state.posts = action.payload;
        },
        clearPost(state) {
            state.posts = [];
        },
        pushPost(state, action:PayloadAction<PostItem>) {
            state.posts = [
                ...state.posts,
                action.payload
            ];
        },
        updatePost(state, action: PayloadAction<PostItem>) {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        updatePostToCollaboration(state, action: PayloadAction<string>) {
            const index = state.posts.findIndex(post => post._id === action.payload);
            if(index !== -1) {
                state.posts[index].isRequested = true;
            }
        }
    }
});

export const {setPost, clearPost, pushPost, updatePost, updatePostToCollaboration} = postSlice.actions;
export default postSlice.reducer;