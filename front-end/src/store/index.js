import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { openviduSlice } from "./openviduSlice";
import { phaseSlice } from "./phaseSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    // localStorage에 저장
    storage,
    // reducer 중에 openvidu reducer만 localstorage에 저장
    whitelist: ["openvidu"],
    // blacklist -> 여기 넣은 reducer 제외
};

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    openvidu: openviduSlice.reducer,
    phase: phaseSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
