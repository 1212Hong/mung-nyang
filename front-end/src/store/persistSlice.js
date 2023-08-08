import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
    key: "userInfo",
    storage,
};

export const persistSlice = createSlice({
    name: "persist",
    initialState,
    reducers: {
        reloadInfo: (state, actions) => {
            const { sessionId, userName, token } = actions.payload;
            state.session = sessionId;
            state.myUserName = userName;
            state.token = token;
        },
    },
});

export const { reloadInfo } = persistSlice.actions;
