import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { openviduSlice } from "./ovenviduSlice";

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    ov: openviduSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
