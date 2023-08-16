package com.mung.mung.common.exception;

public enum ExceptionMessage {
    // 다른 예외 메시지들도 추가 가능
    USER_NOT_EXIST_MESSAGE("User does not exist."),
    ROOM_NOT_EXIST_MESSAGE("Room does not exist."),
    GAME_NOT_EXIST_MESSAGE("Game does not exist."),

    QUIZ_NOT_FOUND_MESSAGE("Quiz does not exist."),
    SET_NOT_EXIST_MESSAGE("GameSet does not exist."),
    LIAR_VOTE_RESULT_NOT_FOUND_MESSAGE("라이어 투표 정보가 존재하지 않습니다"),
    LIAR_ANSWER_OPTIONS_NOT_EXIST_MESSAGE("정답 리스트가 존재하지 않습니다"),
    PLAYER_NOT_EXIST_MESSAGE("Player does not exist."),
    VOTES_NOT_START_MESSAGE("투표가 시작되지 않았습니다"),
    ROOM_ALREADY_START_MESSAGE("이미 게임이 시작된 방입니다."),
    ROOM_ALREADY_EXISTS_MESSAGE("이미 같은 이름으로 생성된 방이 존재합니다"),
    SESSION_NOT_EXIST_MESSAGE("유효하지 않은 세션[ROOM_ID]입니다."),
    ROOM_PASSWORD_WRONG_MESSAGE("비밀번호가 유효하지 않습니다."),
    ROOM_ALREADY_FULL_MESSAGE("방에 인원이 다 찼습니다."),
    PENALTY_NOT_EXIST_MESSAGE("벌칙이 없습니다."),
    NICKNAME_NOT_EXIST_MESSAGE("유효한 닉네임이 없습니다."),
    NICKNAME_ALREADY_EXIST_MESSAGE("이미 존재하는 닉네임 입니다."),
    WORD_NOT_FOUND_MESSAGE("제시어 목록이 없습니다"),

    RECORDING_NOT_STARTED_MESSAGE("녹화가 시작되지 않았습니다.");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
