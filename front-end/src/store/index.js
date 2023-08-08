import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { openviduSlice } from "./openviduSlice";
import { phaseSlice } from "./phaseSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
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
            // serializableCheck: {
            // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // ovActions: false,
            // },
        }),
});
export const persistor = persistStore(store);
export default store;
