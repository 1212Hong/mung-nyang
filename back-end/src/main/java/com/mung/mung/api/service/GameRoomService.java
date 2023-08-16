package com.mung.mung.api.service;

import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.common.exception.custom.GameNotExistException;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.RoomAlreadyExistsException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.GameRepository;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;

    @Transactional
    public void makeRoom(String roomId, final GameRoomCreateReq gameRoomCreateReq) {
        // DB에서 roomId가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        if (roomId == null || roomId.isEmpty()) {
            throw new RoomNotExistException();
        }
        GameRoom existingGameRoom = gameRoomRepository.findByRoomId(roomId);
        if (existingGameRoom != null) {
            // 이미 해당 roomId가 존재하는 경우
            throw new RoomAlreadyExistsException();
        }
        // 존재하지 않으면 roomId로 방 생성
        ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");
        ZonedDateTime seoulTime = ZonedDateTime.of(LocalDateTime.now(), seoulZoneId);

        GameRoom gameRoom = GameRoom.builder()
                .roomId(roomId)
                .roomPw(gameRoomCreateReq.getRoomPw())
                .status("waiting")
                .startTime(seoulTime.toLocalDateTime())
                .build();
        gameRoomRepository.save(gameRoom);
    }

    @Transactional
    public boolean isRoomExists(String roomId) {
        // DB에서 roomId가 있는지 검색 후 없으면 아래처럼 데이터 저장 후 생성, 있으면 return false
        GameRoom existingRoom = gameRoomRepository.findByRoomId(roomId);
        if (existingRoom == null) {
            // 방이 없으면
            throw new RoomNotExistException();
        }
        return true;

    }

    @Transactional
    public String getRoomStatus(String roomId) {
        // roomStatus 반환
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        return gameRoom.getStatus();
    }


    @Transactional
    public void leaveRoom(long playerId) {
        if (playerRepository.findByPlayerId(playerId) == null) {
            throw new PlayerNotExistException();
        }
        log.info("player info : {}", playerId);
        playerRepository.deleteByPlayerId(playerId);
    }

    @Transactional
    public long playersCnt(String roomId) {
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        return gameRoom.getPlayers().size();
    }

    @Transactional
    public void deleteRoom(String roomId) {
        if (gameRoomRepository.findByRoomId(roomId) == null) {
            throw new RoomNotExistException();
        }
        gameRoomRepository.deleteByRoomId(roomId);
    }

    @Transactional
    public void roomInitialize(String roomId) {
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        gameRoom.updateStatus("waiting");
    }

    @Transactional // Video URL을 game에 저장
    public void saveRecording(long gameId, String newVideoURL) {
        Game game = gameRepository.findByGameId(gameId);
        if (game == null) {
            throw new GameNotExistException();
        }
        game.updateGameVideoUrl(newVideoURL);
        gameRepository.save(game);
    }

    @Transactional
    public List<String> returnRecording(String roomId) {
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        List<String> recordingList = new ArrayList<String>();
        for (Game game : gameRoom.getGames()) {
            recordingList.add(game.getVideoUrl());
        }
        return recordingList;
    }
}
