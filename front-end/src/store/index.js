import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { openviduSlice } from "./openviduSlice";
import { phaseSlice } from "./phaseSlice";
import { gameSlice } from "./gameSlice";
const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    openvidu: openviduSlice.reducer,
    phase: phaseSlice.reducer,
    game: gameSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            // serializableCheck: {
            // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // ovActions: false,
            // },
        }),
});

export default store;
