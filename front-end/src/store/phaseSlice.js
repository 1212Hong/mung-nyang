import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phase: "test",
};

export const choosePhase = (state) => state.phase;

export const phaseSlice = createSlice({
    name: "phase",
    initialState,
    reducers: {
        changePhase: (state, actions) => {
            state.phase = actions.payload;
        },
    },
});

export const { changePhase } = phaseSlice.actions;
