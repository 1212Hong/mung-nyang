package com.mung.mung.stomp.service;

import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import com.mung.mung.stomp.response.StompRoomJoinRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final GameRoomRepository gameRoomRepository;
    private final PlayerRepository playerRepository;

    @Override
    public StompRoomJoinRes joinPlayerInfo(String roomId) {
        return new StompRoomJoinRes(gameRoomRepository.findOwner(roomId), playerRepository.findPlayers(roomId));
    }
}
