package com.mung.mung.api.controller;

import com.mung.mung.api.response.GameStartRes;
import com.mung.mung.api.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    // 타이머 관련 시간 설정
    private Instant gameStartTime = null;
    private final Duration votingDuration = Duration.ofSeconds(20);

    private final int votepeople = 

    @GetMapping("/votestart")
    public ResponseEntity<GameStartRes> startVote(@RequestParam(required = true) String roomId){
        gameStartTime = Instant.now();
        
        return ResponseEntity.ok(new GameStartRes(roomId));
    }

    @GetMapping("/votecheck")
    public ResponseEntity<String> countVote(@RequestParam(required = true) String roomId){
        Instant curTime = Instant.now();

        if (curTime.isBefore(gameStartTime.plus(votingDuration))) {

            return ResponseEntity.ok("투표 완료");
        }else{
            return ResponseEntity.badRequest().body("투표 완료");
        }
        return ResponseEntity.ok(new GameStartRes(roomId));
    }






}
