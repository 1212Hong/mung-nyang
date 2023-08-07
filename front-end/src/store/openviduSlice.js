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
<<<<<<< HEAD
=======
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
>>>>>>> f34ef755c6b70cb79460c8b319f2cd0f06bbf2c7
        createOpenvidu: (state, { payload }) => {
            if (!state.OV) {
                state.myUserName = payload.nickname;
                state.mySessionId = payload.roomId;
                state.OV = new OpenVidu();
                state.session = state.OV.initSession();
<<<<<<< HEAD
                state.devices = state.OV.getDevices();
            }
        },

=======
            }
        },
>>>>>>> f34ef755c6b70cb79460c8b319f2cd0f06bbf2c7
        createPublisher: (state, { payload }) => {
            state.session.publish(payload.publisher);
            state.currentVideoDevice = payload.currentVideoDevice;
            state.mainStreamManager = payload.publisher;
            state.publisher = payload.publisher;
        },
        updateSubscribers: (state, { payload }) => {
            console.log(payload);
            state.subscribers.push(payload.subscriber);
        },
    },
});
export const { saveSessionId, saveSubscribers } = openviduSlice.actions;
export const ovActions = openviduSlice.actions;
