package com.mung.mung.stomp.service;

import com.mung.mung.db.entity.GameRoom;

public interface RoomService {

    GameRoom findById(String roomId);
}
