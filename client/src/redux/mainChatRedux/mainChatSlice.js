import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showChat: true,
}

const mainChatSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTrue: (state) => {
            state.showChat = true
        },
        toggleFalse: (state) => {
            state.showChat = false
        }
    }
});

export const { toggleTrue, toggleFalse } = mainChatSlice.actions;

export default mainChatSlice.reducer;