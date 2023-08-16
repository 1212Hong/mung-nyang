package com.mung.mung.api.service;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.api.request.RoomIdReq;
import com.mung.mung.api.response.PlayerStatusRes;
import com.mung.mung.common.exception.custom.NicknameAlreadyExistException;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.RoomAlreadyFullException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final GameRoomRepository gameRoomRepository;
//    private final NicknameRepository nicknameRepository;

//    public final long nicknameCount = dogRepository.count() if count가 1보다 작으면 1이 되도록;


    // Player가 Join한 데이터를 저장
    @Transactional // return값이 true라면 방장이라는 뜻, false라면 방장이 아님
    public boolean joinRoom(PlayerJoinReq playerJoinReq) {
        boolean ownerCheck = false;
        GameRoom gameRoom = gameRoomRepository.findByRoomId(playerJoinReq.getRoomId());
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        List<Player> players = gameRoom.getPlayers();
        List<String> nicknameList = new ArrayList<>();
        for (Player player : players) {
            nicknameList.add(player.getPlayerNickname());
        }
        if (nicknameList.contains(playerJoinReq.getPlayerNickname())) {
            throw new NicknameAlreadyExistException();
        }
        // 방에 입장한 플레이어 인원체크를 join단에서 수행
        if (players.size() >= 6) {
            throw new RoomAlreadyFullException();
        }
        if (players.size() < 1) {
            // 방에 아무도 입장을 안했다면, 처음 입장한 사람을 방장으로 선택
            gameRoom.updateOwner(playerJoinReq.getPlayerNickname());
            ownerCheck = true;
            gameRoomRepository.save(gameRoom);
        }

        // 플레이어 인원 저장
        Player player = Player.builder()
                .playerNickname(playerJoinReq.getPlayerNickname())
                .gameRoom(gameRoom)
                .playerScore(0)
                .build();
        playerRepository.save(player);
        return ownerCheck;
    }

    // Player 데이터를 반환하는데 사용할 계획. Room Join 시, Player Score요청 시 계속 테이블에서 찾지 않기 위함.
    @Transactional
    public long GetPlayerId(String playerNickname, String roomId) {
        Long playerId = playerRepository.GetPlayerId(playerNickname, roomId);
        if (playerId == null) {
            throw new PlayerNotExistException();
        }
        return playerId;
    }

    // 처음 Join때 id를 얻어두면 이후 status조회 시 front단에서 계속 보내줌으로써 pk인덱스로 빠르게 조회가능
    // 사용할 곳 => 처음 조인, score조회 시 status로 사용
    // ex) getPlayerScore
    @Transactional
    public PlayerStatusRes getPlayerStatus(long playerId, String playerNickname, String roomId, boolean owner) {
        Player player = playerRepository.findByPlayerId(playerId);
        if (player == null) {
            throw new PlayerNotExistException();
        }
        PlayerStatusRes playerStatusRes = PlayerStatusRes.builder()
                .playerId(playerId)
                .roomId(roomId)
                .playerNickname(playerNickname)
                .owner(owner)
                .playerScore(player.getPlayerScore())
                .build();
        return playerStatusRes;
    }

    // player 점수 초기화
    @Transactional
    public void playerInitailize(String roomId) {
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        List<Player> players = gameRoom.getPlayers();
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }
        for (Player player : players) {
            player.changeScore(0);
            playerRepository.save(player);
        }
    }

    @Transactional
    public String changeOwner(RoomIdReq roomIdReq) {
        String roomId = roomIdReq.getRoomId();
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        List<Player> players = gameRoom.getPlayers();
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }
        int playerCnt = players.size();

        Random random = new Random();
        int randomNumber = random.nextInt(playerCnt) + 1;
        Player randomOwner = players.get(randomNumber);
        return randomOwner.getPlayerNickname();
    }
}
