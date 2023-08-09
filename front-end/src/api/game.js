import API from "./base";

// 게임 시작 투표 시작
export const startGameVote = (roomId) => {
    API.post(`/api/vote/start?roomId=${roomId}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 수락 or 거절의사 보내기
export const castGameVote = (roomId, check) => {
    API.post(`/api/vote/count`, {
        roomId: roomId,
        voteCheck: check,
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 수락 or 거절 post to openvidu
export const agreeVote = (check) => {
    API.post(`/openvidu/api/signal`, {
        session: "ses_YnDaGYNcd7",
        to: ["con_Xnxg19tonh", "con_TNVdbuQCJF"],
        type: "MY_TYPE",
        data: "This is my signal data",
    });
};

// 카테고리 내 제시어
export const selectCategory = (roomId, category) => {
    return API.get(`api/quiz/category/${roomId}`, { category: category });
};

// 비상정답
export const emergencyAnswer = (roomId, emergencyPlayerNickname, answer) => {
    return API.post(`/api/answer/emergency`, {
        roomId: roomId,
        emergencyPlayerNickname: emergencyPlayerNickname,
        answer: answer,
    });
};

// 최종정답
export const FinalAnswer = (roomId, answer) => {
    return API.post(`/api/answer/final`, { roomId: roomId, answer: answer });
};

// 제시어 정답 목록 요청
export const listAnswer = (roomId) => {
    return API.get(`/pub/liar-category${roomId}`);
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

// 라이어 투표
export const selectLiar = (setId, playerNickname) => {
    return API.post(`/api/liar/vote`, {
        setId: setId,
        playerNickname: playerNickname,
    });
};

// 라이어 투표 결과
export const selectedLiar = (setId) => {
    return API.get(`/api/liar/result/?setId=${setId}`);
};

// 라이어 투표 내역 삭제
export const deleteLiar = (setId) => {
    return API.delete(`/api/liar/resetVote/${setId}`);
};

// 라이어 정답
export const liarAnswer = (setId, roomId, pickedLiar, answer) => {
    return API.post(`/api/answer/liar`, {
        setId: setId,
        roomId: roomId,
        pickedLiar: pickedLiar,
        answer: answer,
    });
};
