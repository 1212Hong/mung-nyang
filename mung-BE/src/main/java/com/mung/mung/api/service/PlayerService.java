package com.mung.mung.api.service;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.api.response.PlayerStatusRes;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final GameRoomRepository gameRoomRepository;

    // Player가 Join한 데이터를 저장
    @Transactional
    public void joinRoom(PlayerJoinReq playerJoinReq){
        GameRoom gameRoom = gameRoomRepository.findByRoomId(playerJoinReq.getRoomId());
        if (gameRoom != null){
            System.out.println(playerJoinReq);

            Player player = Player.builder()
                .playerNickname(playerJoinReq.getPlayerNickname())
                .gameRoom(gameRoom)
                .build();
        playerRepository.save(player);
        }else{
            System.out.println("else test");
            // gameRoom이 존재하지 않는 경우에 대한 처리
            throw new IllegalArgumentException("Invalid roomId: " + playerJoinReq.getRoomId());
        }
    }

    // Player 데이터를 반환하는데 사용할 계획. Room Join 시, Player Score요청 시 계속 테이블에서 찾지 않기 위함.
    @Transactional
    public long GetPlayerId(String playerNickname, String roomId){
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        List<Player> players = gameRoom.getPlayers();
        for (Player player : players) {
            if (player.getPlayerNickname().equals(playerNickname)) {
                return player.getPlayerId();
            }
        }
        // 해당 playerNickname이 없는 경우 예외 처리
        throw new NoSuchElementException("Player not found with nickname: " + playerNickname);
    }


    // 처음 Join때 id를 얻어두면 이후 status조회 시 front단에서 계속 보내줌으로써 pk인덱스로 빠르게 조회가능
    // 사용할 곳 => 처음 조인, score조회 시 status로 사용
    // ex) getPlayerScore
    @Transactional
    public PlayerStatusRes getPlayerStatus(long playerId, String playerNickname, String roomId){
        Player player = playerRepository.findByPlayerId(playerId);
        if (player == null) {
            throw new NoSuchElementException("Player not found with ID: " + playerId);
        }
        PlayerStatusRes playerStatusRes = PlayerStatusRes.builder()
                .playerId(playerId)
                .roomId(roomId)
                .playerNickname(playerNickname)
                .playerScore(player.getPlayerScore())
                .build();
        return playerStatusRes;
    }

//    this.roomId=roomId;
//        this.playerNickname=playerNickname;
//        this.playerScore=playerScore;
}
