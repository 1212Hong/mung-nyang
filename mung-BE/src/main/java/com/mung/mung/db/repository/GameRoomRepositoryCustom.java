package com.mung.mung.db.repository;

import com.mung.mung.api.dto.GameRoomDto;
import com.mung.mung.db.entity.GameRoom;

import java.util.List;

public interface GameRoomRepositoryCustom {
    GameRoomDto findByTitle(String roomTitle);
}
