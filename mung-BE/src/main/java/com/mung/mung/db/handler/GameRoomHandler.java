package com.mung.mung.db.handler;

import com.mung.mung.db.entity.GameRoom;

import java.time.LocalDateTime;

public interface GameRoomHandler {

    public GameRoom createGameRoom(String roomId, String roomPw);
    public GameRoom getGameRoom(String roomId); // 어떤 값을 사용할지 추후 결정

}

