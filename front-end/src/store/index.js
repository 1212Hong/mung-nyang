import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { openviduSlice } from "./openviduSlice";
import { phaseSlice } from "./phaseSlice";

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    openvidu: openviduSlice.reducer,
    phase: phaseSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
