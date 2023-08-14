import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    setCnt: 0, // 방장이 정한 게임 총 세트 수
    gameVoteCnt: 0, // 게임 시작투표에 대한 누적 카운트
    setId: 0,
    score: 0,
    selectedLiar: "",
    answerer: "",
    word: "",
    gameId: 0,
    playerId: "",
    selectedAnswer: "",
    result: "",
    category: "",
    dupLiars: [],
    penaltyUser: "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        saveSetCnt: (state, action) => {
            state.setCnt = action.payload;
        },
        saveGameVoteCnt: (state, action) => {
            state.gameVoteCnt = action.payload;
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
        updateDupLiars: (state, action) => {
            state.dupLiars = action.payload;
        },
        updatePenaltyUser: (state, action) => {
            state.penaltyUser = action.payload;
        },
    },
});

export const gameActions = gameSlice.actions;
