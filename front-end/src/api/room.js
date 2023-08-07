import API from "./base";

export const createRoom = (roomId, roomPw) => {
    // 반환된 Promise를 반환하여, 함수 호출한 쪽에서 처리할 수 있도록 함
    return API.post(`/api/game-sessions`, { roomId: roomId, roomPw: roomPw });
};

// createRoom으로 만든 sessionId에 해당하는 방에 연결 -> 반환 : 토큰값
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
