import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    setCnt: 0,
    setId: 0,
    score: {
        리트리버: 0,
        리트리버2: 0,
        테스트유저2: 42,
        테스트유저1: 1,
    },
    selectedLiar: "",
    answerer: "",
    word: "",
    gameId: 0,
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
            state.score = action.payload;
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
        initGameState: (state) => {
            state = initialState;
        },
    },
});

export const gameActions = gameSlice.actions;
