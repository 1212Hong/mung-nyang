import {
    QuizAnswer,
    QuizAnswerNegative,
    QuizAnswerPositive,
    QuizResult,
} from "../api/game";

export const fetchQuizInfo = async (roomId) => {
    try {
        const quizAnswerResponse = await QuizAnswer(roomId);
        const { question, answer1, answer2 } = quizAnswerResponse.data;

        return { question, answer1, answer2 };
    } catch (error) {
        console.log(error);
    }
};

export const submitAnswer = async (roomId, playerNickname, isPositive) => {
    try {
        if (isPositive) {
            await QuizAnswerPositive(roomId, playerNickname);
        } else {
            await QuizAnswerNegative(roomId, playerNickname);
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchQuizResult = async (roomId, gameId) => {
    try {
        const quizResultresponse = await QuizResult(roomId, gameId);
        return quizResultresponse.data;
    } catch (error) {
        console.log(error);
    }
};
