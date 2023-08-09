import {
    QuizAnswer,
    QuizAnswerNegative,
    QuizAnswerPositive,
    QuizResult,
    selectCategory,
    emergencyAnswer,
    finalAnswer,
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
export const fetchUserRole = async (roomId, gameId, category, answerer) => {
    try {
        const userRoleResponse = await selectCategory(
            roomId,
            gameId,
            category,
            answerer,
        );
        console.log(userRoleResponse.data.playersRoleInfo);
        return userRoleResponse.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchEmergencyAnswerResponse = async (
    roomId,
    setId,
    playerNickname,
    answer,
) => {
    try {
        const emergencyAnswerResponse = await emergencyAnswer(
            roomId,
            setId,
            playerNickname,
            answer,
        );
        console.log(emergencyAnswerResponse.data);
        return emergencyAnswerResponse.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchFinalAnswerResponse = async (setId, roomId, answer) => {
    try {
        const finalAnswerResponse = await finalAnswer(setId, roomId, answer);
        console.log(finalAnswerResponse.data);
        return finalAnswerResponse.data;
    } catch (error) {
        console.log(error);
    }
};
