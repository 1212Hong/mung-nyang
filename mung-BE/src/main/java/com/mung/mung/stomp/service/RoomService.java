package com.mung.mung.stomp.service;

import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.stomp.response.StompRoomJoinRes;

public interface RoomService {

    StompRoomJoinRes joinPlayerInfo(String roomId);
}
