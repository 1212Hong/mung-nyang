import API from "./base";

export const createRoom = (roomId, roomPw) => {
    // 반환된 Promise를 반환하여, 함수 호출한 쪽에서 처리할 수 있도록 함
    return API.post(`/api/game-sessions`, { roomId: roomId, roomPw: roomPw });
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
