import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phase: "Test",
};

export const choosePhase = (state) => state.phase;

export const phaseSlice = createSlice({
    name: "phase",
    initialState,
    reducers: {
        changePhase: (state, actions) => {
            const { phaseType } = actions.payload;
            console.log(phaseType);
            state.phase = phaseType;
        },
    },
});

export const { changePhase } = phaseSlice.actions;
