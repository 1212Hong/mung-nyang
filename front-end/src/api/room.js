import API from "./base";

export const createRoom = (roomId, roomPw) => {
    // 반환된 Promise를 반환하여, 함수 호출한 쪽에서 처리할 수 있도록 함
    return API.post(`/api/game-sessions`, { roomId: roomId, roomPw: roomPw });
};

export const connectRoom = (sessionId, roomPw) => {
    console.log(sessionId);
    return API.post(`/api/game-sessions/${sessionId}/connections`, {
        roomPw: roomPw,
    });
};

// 방입장
export const joinRoom = (sessionId, roomPw) => {
    return API.post(`/api/roompw`);
};
