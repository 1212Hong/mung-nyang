package com.mung.mung.db.handler;

import com.mung.mung.db.entity.GameRoom;

import java.time.LocalDateTime;

public interface GameRoomHandler {

    public GameRoom createGameRoom(long roomPk, String roomTitle, String roomPw, String roomUrl);
    public GameRoom getGameRoom(long roomPk); // 어떤 값을 사용할지 추후 결정

}

