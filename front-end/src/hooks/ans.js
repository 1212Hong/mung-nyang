import { emergencyAnswer, finalAnswer } from "../api/game";

export const fetchEmergencyAnswerResponse = async (
    setId,
    roomId,
    playerNickname,
    answer,
) => {
    try {
        const emergencyAnswerResponse = await emergencyAnswer(
            setId,
            roomId,
            playerNickname,
            answer,
        );
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
