package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;

import java.util.List;

public interface GameRoomRepositoryCustom {
    List<GameRoom> findByTitle(String roomTitle);
}
