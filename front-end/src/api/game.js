import API from "./base";
import OPENVIDU from "./openvidu";

// 게임 시작 투표 시작
export const startGameVote = (roomId) => {
    API.post(`/api/vote/start`, {
        roomId: roomId,
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 시작 signal
export const signalStartGameVote = (sessionId) => {
    OPENVIDU.post(`/openvidu/api/signal`, {
        session: sessionId,
        to: [],
        type: "startGameVote",
        data: "start game vote",
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 수락 or 거절의사 보내기
export const castGameVote = (roomId, check) => {
    return API.post(`/api/vote/count`, {
        roomId: roomId,
        voteMessage: check,
    });
};

// 투표 수락 or 거절 post to openvidu
export const signalVote = (check, sessionId) => {
    OPENVIDU.post(`/openvidu/api/signal`, {
        session: sessionId,
        to: [],
        type: check === "T" ? "agree" : "disagree",
        data: check,
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 결과 요청
export const getVoteRes = (roomId, maxSet) => {
    return API.post(`/api/vote/result`, {
        roomId: roomId,
        maxSet: maxSet,
    });
};

// 투표 결과 delete
export const deleteVote = (roomId) => {
    API.delete(`/api/vote/resetVote/${encodeURIComponent(roomId)}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

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
    playerNickname,
    answer,
) => {
    return await API.post(`/api/answer/emergency`, {
        setId,
        roomId,
        playerNickname,
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

// 채팅
export const signalSendMessage = (sessionId, text) => {
    OPENVIDU.post(`/openvidu/api/signal`, {
        session: sessionId,
        to: [],
        type: "chat",
        data: text,
    });
};
