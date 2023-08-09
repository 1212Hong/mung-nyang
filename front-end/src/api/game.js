import API from "./base";

// 카테고리 내 제시어
export const selectCategory = async (roomId, gameId, category, answerer) => {
    return await API.post(`api/quiz/category`, {
        roomId,
        gameId,
        category,
        answerer,
    });
};

// 비상정답
export const emergencyAnswer = async (
    setId,
    roomId,

    emergencyPlayerNickname,
    answer,
) => {
    return await API.post(`/api/answer/emergency`, {
        setId,
        roomId,
        emergencyPlayerNickname,
        answer,
    });
};

// 최종정답
export const finalAnswer = async (setId, roomId, answer) => {
    return await API.post(`/api/answer/final`, {
        setId,
        roomId,
        answer,
    });
};

// 제시어 정답 목록 요청
export const listAnswer = (roomId) => {
    return API.get(`/pub/liar-category${roomId}`);
};

// 지목된 라이어에 정답 목록 표출
export const liarAnswer = async (setId) => {
    return await API.get(`api/liar/options?setId=${setId}`);
};

// 퀴즈 시작시 질문지와 answer 1,2 요청
export const QuizAnswer = (roomId) => {
    return API.post(`/api/quiz/start/${roomId}`, { roomId: roomId });
};

// 퀴즈에서 사용자가 왼쪽 정답을 선택한 경우
export const QuizAnswerPositive = (roomId, playerNickname) => {
    return API.post(`/api/quiz/positive`, {
        roomId: roomId,
        playerNickname: playerNickname,
    });
};

// 퀴즈에서 사용자가 오른쪽 정답을 선택한 경우
export const QuizAnswerNegative = (roomId, playerNickname) => {
    return API.post(`/api/quiz/negative`, {
        roomId: roomId,
        playerNickname: playerNickname,
    });
};

// 퀴즈의 결과(0 : 왼쪽, 1 : 오른쪽, 2: 무승부)와 정답자를 백에서 보내줌
export const QuizResult = (roomId, gameId) => {
    return API.get(`/api/quiz/result`, {
        roomId: roomId,
        gameId: gameId,
    });
};
