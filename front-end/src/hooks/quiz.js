import {
    QuizAnswer,
    QuizAnswerNegative,
    QuizAnswerPositive,
    QuizResult,
} from "../api/game";

export const fetchQuizInfo = async (roomId) => {
    try {
        const quizAnswerResponse = await QuizAnswer(roomId);
        console.log("테스트");
        console.log("퀴즈입장 데이터 : ", quizAnswerResponse.data);
        const { question, answer1, answer2 } = quizAnswerResponse.data;

        return { question, answer1, answer2 };
    } catch (error) {
        console.log("퀴즈시작에러 : ", error);
    }
};

export const submitAnswer = async (roomId, myUserName, userChoice) => {
    try {
        if (userChoice === "positive") {
            await QuizAnswerPositive(roomId, myUserName);
            console.log(QuizAnswerPositive);
            console.log(roomId, myUserName);
        } else if (userChoice === "negative") {
            await QuizAnswerNegative(roomId, myUserName);
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchQuizResult = async (roomId) => {
    try {
        console.log("테스트 :", roomId);
        const quizResultresponse = await QuizResult(roomId);
        console.log("테스트 결과", quizResultresponse.data);
        return quizResultresponse.data;
    } catch (error) {
        console.log(error.response);
    }
};
