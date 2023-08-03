package com.mung.mung.api.service;

import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.GameRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class GameRoomService {
    private final GameRoomRepository gameRoomRepository;

    @Autowired
    public GameRoomService(GameRoomRepository gameRoomRepository){
        this.gameRoomRepository=gameRoomRepository;
    }

    @Transactional
    public boolean makeRoom(String roomId, final GameRoomCreateReq gameRoomCreateReq){
        // DB에서 roomId가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        GameRoom existingGameRoom = gameRoomRepository.findByRoomId(roomId);
        if (existingGameRoom != null) {
            // 이미 해당 roomId가 존재하는 경우
            return false;
        } else
        {

            System.out.println(roomId);
            GameRoom gameRoom = GameRoom.builder()
                    .roomId(roomId)
                    .roomPw(gameRoomCreateReq.getRoomPw())
                    .startTime(LocalDateTime.now())
                    .build();
            gameRoomRepository.save(gameRoom);
            return true;
        }
    }
}
