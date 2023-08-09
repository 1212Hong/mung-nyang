package com.mung.mung.api.service;

import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.RoomAlreadyExistsException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final PlayerRepository playerRepository;

    @Transactional
    public void makeRoom(String roomId, final GameRoomCreateReq gameRoomCreateReq){
        // DB에서 roomId가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        if (roomId == null || roomId.isEmpty()) {
            throw new RoomNotExistException();
        }
        GameRoom existingGameRoom = gameRoomRepository.findByRoomId(roomId);
        if (existingGameRoom != null) {
            // 이미 해당 roomId가 존재하는 경우
            throw new RoomAlreadyExistsException();
        } else
        { // 존재하지 않으면 roomId로 방 생성
            ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");
            ZonedDateTime seoulTime = ZonedDateTime.of(LocalDateTime.now(), seoulZoneId);

            System.out.println(roomId);
            GameRoom gameRoom = GameRoom.builder()
                    .roomId(roomId)
                    .roomPw(gameRoomCreateReq.getRoomPw())
                    .status("waiting")
                    .startTime(seoulTime.toLocalDateTime())
                    .build();
            gameRoomRepository.save(gameRoom);
        }
    }

    @Transactional
    public boolean isPlayerExists(long playerId){
        // DB에서 Player가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        Player existingPlayer = playerRepository.findByPlayerId(playerId);
        if (existingPlayer == null) {
            throw new PlayerNotExistException();
        } else
        {   // 있으면
            return true;
        }
    }

    @Transactional
    public boolean isRoomExists(String roomId){
        // DB에서 roomId가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        GameRoom existingRoom = gameRoomRepository.findByRoomId(roomId);
        if (existingRoom == null) {
            // 방이 없으면
            throw new RoomNotExistException();
        } else
        {
            return true;
        }
    }

    @Transactional
    public String getRoomStatus(String roomId){
        // roomStatus 반환
       GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
       if (gameRoom == null){
           throw new RoomNotExistException();
       }
       return gameRoom.getStatus();
    }


    @Transactional
    public void leaveRoom(long playerId) {
        if (playerRepository.findByPlayerId(playerId) == null){
            throw new PlayerNotExistException();
        }
        playerRepository.deleteByPlayerId(playerId);
    }


    @Transactional
    public void deleteRoom(String roomId){
        if (gameRoomRepository.findByRoomId(roomId) == null){
            throw new RoomNotExistException();
        }
        gameRoomRepository.deleteByRoomId(roomId);
    }

    @Transactional
    public void roomInitialize(String roomId){
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom==null){
            throw new RoomNotExistException();
        }
        gameRoom.updateStatus("waiting");
    }
}
