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
    selectedAnswer: "",
    result: "",
    category: "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        saveSetCnt: (state, action) => {
            state.setCnt = action.payload;
        },
        saveSetId: (state, action) => {
            state.setId = action.payload;
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
            state.word = action.payload;
        },
        saveGameId: (state, action) => {
            state.gameId = action.payload;
        },
        saveResult: (state, action) => {
            state.result = action.payload;
        },
        saveCategory: (state, action) => {
            state.category = action.payload;
        },
        updateSelectedLiar: (state, action) => {
            state.selectedLiar = action.payload;
        },
        updateSelectedAnswer: (state, action) => {
            state.selectedAnswer = action.payload;
        },
        updateResult: (state, action) => {
            state.result = action.payload;
        },
    },
});

export const gameActions = gameSlice.actions;
