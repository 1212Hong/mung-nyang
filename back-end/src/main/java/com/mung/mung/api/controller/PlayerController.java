package com.mung.mung.api.controller;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.api.request.RoomIdReq;
import com.mung.mung.api.response.PlayerStatusRes;
import com.mung.mung.api.service.GameRoomService;
import com.mung.mung.api.service.NicknameService;
import com.mung.mung.api.service.PlayerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/player")
public class PlayerController {

    private final PlayerService playerService;
    private final NicknameService nicknameService;
    private final GameRoomService gameRoomService;

    // player가 테스트 단계에서 닉네임을 정하고 입장을 누르면 DB에 nick과 room_id를 저장한 뒤 player정보 반환.
    @PostMapping("/join")
    public ResponseEntity<PlayerStatusRes> joinGameRoom(@RequestBody PlayerJoinReq playerJoinReq) {
        // player정보를 DB에 저장
        log.info("playerJoinReq : {}", playerJoinReq);
        boolean ownerCheck = playerService.joinRoom(playerJoinReq);

        // 저장 후 조회 해 Id를 보내 줌
        String playerNickname = playerJoinReq.getPlayerNickname();
        String roomId = playerJoinReq.getRoomId();
        long playerId = playerService.GetPlayerId(playerNickname, roomId);
        //owner 추가해야함
        return new ResponseEntity<>(playerService.getPlayerStatus(playerId, playerNickname, roomId, ownerCheck), HttpStatus.OK);
    }

    // 유저에게 랜덤으로 닉네임을 주기.
    @GetMapping("/nickname")
    public ResponseEntity<String> giveNickname(@RequestParam("roomId") String roomId) {
        // player정보를 DB에 저장
        // throw처리 내부에 잇음
        gameRoomService.isRoomExists(roomId);
        // 호출 여러번 하면 안됨 => 숫자 증가가 1이 아니라 2가 돼 안나오는 경우가 생길 수 있음
        return new ResponseEntity<>(nicknameService.giveNickname(roomId), HttpStatus.OK);
        // 저장 후 조회 해 Id를 보내 줌
    }

    @PutMapping("/owner") // Leave처리를 이미 했으므로 방장을 바꿔주기만 하면 됨
    public ResponseEntity<String> changeOwner(@RequestBody RoomIdReq roomIdReq) {
        // return값이 String인 player Nickname임
        String returnAns = playerService.changeOwner(roomIdReq);
        return new ResponseEntity<>(returnAns, HttpStatus.OK);
    }

}
