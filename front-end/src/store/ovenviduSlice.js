import { createSlice } from "@reduxjs/toolkit";
import { OpenVidu } from "openvidu-browser";

const initialState = {
    mySessionId: "",
    myUserName: "",
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
};

export const openviduSlice = createSlice({
    name: "OpenVidu",
    initialState,
    reducers: {
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

        enteredSubscriber: (state, action) => {
            const subscriber = state.session.subscribe(
                action.payload,
                undefined,
            );
            state.subscribers.push(subscriber);
        },

        deleteSubscriber: (state, action) => {
            let index = state.subscribers.indexOf(action.payload, 0);
            if (index > -1) {
                state.subscribers.splice(index, 1);
            }
        },

        leaveSession(state, { payload }) {
            const mySession = state.session;
            if (mySession) {
                mySession.disconnect();
            }

            state.OV = null;
            state.mySessionId = undefined;
            state.myUserName = undefined;
            state.session = undefined;
            state.mainStreamManager = undefined;
            state.publisher = undefined;
            state.subscribers = [];
            state.devices = undefined;
            state.currentVideoDevice = undefined;
        },
    },
});

export const ovActions = openviduSlice.actions;
