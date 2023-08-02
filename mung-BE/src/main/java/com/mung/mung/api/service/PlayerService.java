package com.mung.mung.api.service;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final GameRoomRepository gameRoomRepository;
    @Transactional
    public void joinRoom(PlayerJoinReq playerJoinReq){
        GameRoom gameRoom = gameRoomRepository.findByRoomId(playerJoinReq.getRoomId());
        System.out.println("joinRoom?");
        if (gameRoom != null){
            System.out.println("if test");
            System.out.println(playerJoinReq.getPnIckname());
            System.out.println(playerJoinReq);

            Player player = Player.builder()
                .pNickname(playerJoinReq.getPnIckname())
                .gameRoom(gameRoom)
                .build();
        playerRepository.save(player);
        }else{
            System.out.println("else test");
            // gameRoom이 존재하지 않는 경우에 대한 처리
            throw new IllegalArgumentException("Invalid roomId: " + playerJoinReq.getRoomId());
        }
    }

}
