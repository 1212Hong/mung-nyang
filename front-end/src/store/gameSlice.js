import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    setCnt: 0,
    setId: 0,
    score: 0,
    selectedLiar: "",
    answerer: "",
    word: "",
    gameId: 0,
    playerId: "",
    roomId: "",
    result: "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        saveSetCnt: (state, action) => {
            state.setCnt = action.setCnt;
        },
        saveSetId: (state, action) => {
            state.setId = action.setId;
        },
        saveScore: (state, action) => {
            state.score += action.payload;
        },
        saveLiar: (state, action) => {
            state.selectedLiar = action.payload;
        },
        saveAnswerer: (state, action) => {
            state.answerer = action.payload;
        },
        saveWord: (state, action) => {
            state.word = action.word;
        },

        saveResult: (state, action) => {
            state.result = action.payload;
        },
    },
});

export const gameActions = gameSlice.actions;
