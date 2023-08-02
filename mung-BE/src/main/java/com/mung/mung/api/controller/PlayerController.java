package com.mung.mung.api.controller;

import com.mung.mung.api.request.PlayerJoinReq;
import com.mung.mung.api.service.PlayerService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class PlayerController {

    private final PlayerService playerService;


//    public ResponseEntity<String> createConnection(@RequestBody PlayerJoinReq playerJoinReq)
    @PostMapping("/join")
    public ResponseEntity<String> createConnection(@RequestBody PlayerJoinReq playerJoinReq)
//    public ResponseEntity<String> createConnection(@RequestBody Map<String,String>  playerJoinReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // player정보를 DB에 저장
        System.out.println(playerJoinReq);
        System.out.println("connecttest");
        System.out.println("d아렂댈");
        System.out.println(playerJoinReq);
        
//        playerService.joinRoom(playerJoinReq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
