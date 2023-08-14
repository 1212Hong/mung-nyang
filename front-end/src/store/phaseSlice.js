import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phaseType: "Wait",
};

export const phaseSlice = createSlice({
    name: "phase",
    initialState,
    reducers: {
        changePhase: (state, actions) => {
            const phaseType = actions.payload;
            console.log(phaseType);
            state.phaseType = phaseType;
        },
    },
});

export const { changePhase } = phaseSlice.actions;
