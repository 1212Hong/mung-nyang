import { createSlice } from "@reduxjs/toolkit";
import { OpenVidu } from "openvidu-browser";

const initialState = {
    OV: null,
    mySessionId: undefined,
    myUserName: undefined,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    currentVideoDevice: undefined,
    token: "",
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
        saveSession: (state, action) => {
            state.session = action.payload; // payload에 생성된 session 전달
        },
        saveSubscribers: (state, action) => {
            state.subscribers = action.payload;
            console.log(state.subscribers);
        },
        // Action to save the publisher in the state
        savePublisher: (state, action) => {
            state.publisher = action.payload;
        },

        // Action to delete the publisher from the state
        deletePublisher: (state) => {
            state.publisher = undefined;
        },
        createOpenvidu: (state, { payload }) => {
            if (!state.OV) {
                state.myUserName = payload.nickname;
                state.mySessionId = payload.roomId;
                state.OV = new OpenVidu();
                state.session = state.OV.initSession();
                state.devices = state.OV.getDevices();
            }
        },

        createPublisher: (state, { payload }) => {
            state.session.publish(payload.publisher);
            state.currentVideoDevice = payload.currentVideoDevice;
            state.mainStreamManager = payload.publisher;
            state.publisher = payload.publisher;
        },
    },
});
export const { saveSessionId, saveSubscribers } = openviduSlice.actions;
export const ovActions = openviduSlice.actions;
