import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuUset: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentuUset = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { signInStart, signInSuccess, signInError } = userSlice.actions;
export default userSlice.reducer;