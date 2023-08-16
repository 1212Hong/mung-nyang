import API from "./base";

export const createRoom = (roomId, roomPw) => {
    // 반환된 Promise를 반환하여, 함수 호출한 쪽에서 처리할 수 있도록 함
    return API.post(`/api/game-sessions`, { roomId: roomId, roomPw: roomPw });
};

// createRoom으로 만든 sessionId에 해당하는 방에 연결 -> 반환 : 토큰값
export const connectRoom = (sessionId, roomPw) => {
    console.log(sessionId);
    return API.post(`/api/game-sessions/connections`, {
        roomId: sessionId,
        roomPw: roomPw,
    });
};

// 방입장
export const joinRoom = (sessionId, nickname) => {
    return API.post(`/api/player/join`, {
        roomId: sessionId,
        playerNickname: nickname,
    });
};

// 닉네임 가져오기
export const getNickname = async (sessionId) => {
    try {
        const response = await API.get(
            `/api/player/nickname?roomId=${encodeURIComponent(sessionId)}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 떠난 사용자 처리
export const outRoom = async (sessionId, playerNickname) => {
    return API.delete(
        `/api/game-sessions/leave/${encodeURIComponent(
            sessionId,
        )}/${encodeURIComponent(playerNickname)}`,
    )
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};
