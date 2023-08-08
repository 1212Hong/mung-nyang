import { createSlice } from "@reduxjs/toolkit";
import { OpenVidu } from "openvidu-browser";

const initialState = {
    // OV: null,
    mySessionId: undefined,
    myUserName: undefined,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    currentVideoDevice: undefined,
    token: "",
    owner: false,
    score: 0,
    playerId: 0,
    setId: 1,
};

export const openviduSlice = createSlice({
    name: "openvidu",
    initialState,
    reducers: {
        saveSessionId: (state, action) => {
            state.mySessionId = action.payload;
            console.log(state.mySessionId);
        },
        saveToken: (state, action) => {
            state.token = action.payload;
            console.log(state.token);
        },
        saveUserName: (state, action) => {
            state.myUserName = action.payload;
        },
        savePlayerInfo: (state, { payload }) => {
            console.log(payload);
            state.owner = payload.owner;
            state.score = payload.score;
            state.playerId = payload.playerId;
        },
        saveSession: (state, action) => {
            state.session = action.payload; // payload에 생성된 session 전달
        },
        saveSubscribers: (state, action) => {
            state.subscribers.push(action.payload);
            console.log(state.subscribers);
        },
        // Action to save the publisher in the state
        savePublisher: (state, action) => {
            state.publisher = action.payload;
        },
        saveCurrentVideoDevice: (state, action) => {
            state.currentVideoDevice = action.payload;
        },
        saveMainStreamManager: (state, action) => {
            state.mainStreamManager = action.payload;
        },
        // Action to delete the publisher from the state
        deletePublisher: (state) => {
            state.publisher = undefined;
        },

        updateSubscribers: (state, { payload }) => {
            console.log(payload);
            state.subscribers = [...state.subscribers, payload];
        },
        leaveSession: (state, { payload }) => {
            [...state] = [...payload];
        },
    },
});
export const { saveSessionId, updateSubscribers } = openviduSlice.actions;
export const ovActions = openviduSlice.actions;
