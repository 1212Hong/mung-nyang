package com.mung.mung.api.controller;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.api.response.PlayerStatusRes;
import com.mung.mung.api.service.GameRoomService;
import com.mung.mung.api.service.NicknameService;
import com.mung.mung.api.service.PlayerService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/player")
public class PlayerController {

    private final PlayerService playerService;
    private final NicknameService nicknameService;
    private final GameRoomService gameRoomService;

    // player가 테스트 단계에서 닉네임을 정하고 입장을 누르면 DB에 nick과 room_id를 저장한 뒤 player정보 반환.
    @PostMapping("/join")
    public ResponseEntity<PlayerStatusRes> joinGameRoom(@RequestBody PlayerJoinReq playerJoinReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // player정보를 DB에 저장
        System.out.println(playerJoinReq);
        boolean ownerCheck = playerService.joinRoom(playerJoinReq);

        // 저장 후 조회 해 Id를 보내 줌
        String playerNickname=playerJoinReq.getPlayerNickname();
        String roomId = playerJoinReq.getRoomId();
        long playerId= playerService.GetPlayerId(playerNickname, roomId);
        //owner 추가해야함
//        System.out.println(playerService.getPlayerStatus(playerId, playerNickname, roomId, ownerCheck));
        return new ResponseEntity<>(playerService.getPlayerStatus(playerId, playerNickname, roomId, ownerCheck),HttpStatus.OK);
    }

    // 유저에게 랜덤으로 닉네임을 주기.
    @GetMapping("/nickname/{roomId}")
    public ResponseEntity<String> giveNickname(@PathVariable("roomId") String roomId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // player정보를 DB에 저장
        if (!gameRoomService.isRoomExists(roomId)){
            return new ResponseEntity<>("방이 유효하지 않습니다.",HttpStatus.BAD_REQUEST);
        };

        if (nicknameService.giveNickname(roomId).equals("NotAllowNickname")){
            return new ResponseEntity<>("닉네임을 가져올 수 없습니다...",HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(nicknameService.giveNickname(roomId),HttpStatus.OK);
        }
        // 저장 후 조회 해 Id를 보내 줌
    }

    // 점수 보내주는 방법 수정 예정.
//    @PostMapping("/score")
//    public ResponseEntity<PlayerStatusRes> createConnection(@RequestBody PlayerJoinReq playerJoinReq)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        return new ResponseEntity<>(playerService.getPlayerStatus(playerId, playerNickname, roomId),HttpStatus.OK);
//    }
}
