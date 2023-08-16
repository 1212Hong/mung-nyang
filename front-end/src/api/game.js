import API from "./base";

// 게임 시작 투표 시작
export const startGameVote = (roomId) => {
    API.post(`/api/vote/start`, {
        roomId: roomId,
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 투표 수락 or 거절의사 보내기
export const castGameVote = async (roomId, check) => {
    return API.post(`/api/vote/count`, {
        roomId: roomId,
        voteMessage: check,
    });
};

// 투표 결과 요청
export const getVoteRes = (roomId, maxSet) => {
    return API.post(`/api/vote/result`, {
        roomId: roomId,
        maxSet: maxSet,
    });
};

// 투표 결과 delete
export const deleteVote = async (roomId) => {
    API.delete(`/api/vote/resetVote/${encodeURIComponent(roomId)}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

// 카테고리 내 제시어
export const selectCategory = (roomId, gameId, category, answerer) => {
    console.log(roomId, gameId, category, answerer);
    return API.post(`api/quiz/category`, {
        roomId: roomId,
        gameId: gameId,
        category: category,
        answerer: answerer,
    });
};
// 해당 플레이어 제시어
export const getUserWord = (setId, playerNick) => {
    return API.get(`/api/quiz/word/${setId}/${playerNick}`);
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

// 퀴즈 시작시 질문지와 answer 1,2 요청 -> 이거 요청시 계속 랜덤으로 돌아가서 6명 다른 질문지 받게됨
// -> 그래서 게임시작투표 패스되면 그때 퀴즈 랜덤으로 선출된거 백에서 저장후 그 세트의 질문은 고정으로 get요청으로 가져올예정
export const QuizAnswer = (gameId) => {
    return API.get(`/api/quiz/start/${gameId}`);
};

// 퀴즈에서 사용자가 왼쪽 정답을 선택한 경우
export const QuizAnswerPositive = async (roomId, playerNickname) => {
    return API.post(`/api/quiz/positive`, {
        roomId: roomId,
        playerNickname: playerNickname,
    }).then((data) => console.log(data));
};

// 퀴즈에서 사용자가 오른쪽 정답을 선택한 경우
export const QuizAnswerNegative = async (roomId, playerNickname) => {
    return API.post(`/api/quiz/negative`, {
        roomId: roomId,
        playerNickname: playerNickname,
    }).then((data) => console.log(data));
};

// 퀴즈의 결과(0 : 왼쪽, 1 : 오른쪽, 2: 무승부)와 정답자를 백에서 보내줌
export const QuizResult = (roomId) => {
    return API.get(`/api/quiz/result?roomId=${roomId}`);
};

// 점수 집계
export const score = (roomId) => {
    return API.get(`/api/score/get/?roomId=${roomId}`);
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
export const Result = (setId, roomId, pickedLiar, answer) => {
    return API.post(`/api/answer/liar`, {
        setId: setId,
        roomId: roomId,
        pickedLiar: pickedLiar,
        answer: answer,
    });
};

// Dance Url 요청
export const DanceUrl = () => {
    return API.get(`/api/penalty`);
};

// Penalty User 요청
export const PenaltyUser = (roomId) => {
    return API.get(`/api/penalty/player?roomId=${roomId}`);
};
// Game 끝난 후 초기화
export const InitializedData = (roomId) => {
    return API.put(`/api/game-sessions/initialize`, {
        roomId: roomId,
    });
};

// 녹화 시작 요청
export const RecordStart = (roomId, gameId) => {
    return API.post(`/api/room/recording/start`, {
        roomId: roomId,
        gameId: gameId,
    });
};

// 녹화 중단 요청
export const RecordStop = (roomId, gameId) => {
    return API.post(`/api/room/recording/stop`, {
        roomId: roomId,
        gameId: gameId,
    });
};

// 저장된 녹화 영상들 가져오기
export const getRecords = (roomId) => {
    API.get(`/api/room/recording/get/${encodeURIComponent(roomId)}`);
};

// 벌칙 영상 전부 가져오기
export const getPenaltyLink = (roomId) => {
    return API.get(`/api/room/recording/get/${roomId}`);
};
