package com.mung.mung.api.controller;

import com.mung.mung.api.response.GameStartRes;
import com.mung.mung.api.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    @PostMapping("/startvote")
    public ResponseEntity<GameStartRes> startVote(@RequestParam(required = true) String roomId) {
        gameService.startVote(roomId);

        return ResponseEntity.ok(new GameStartRes(roomId));
    }

    @PostMapping("/vote")
    public ResponseEntity<String> countVote(@RequestParam(required = true) String roomId) {

        String result = gameService.countVote(roomId);

        return ResponseEntity.ok(result);

    }

    @GetMapping("/voteResult")
    public ResponseEntity<String> getVoteResult(@RequestParam String roomId) {
        String result = gameService.getVoteResult(roomId);
        return ResponseEntity.ok(result);
    }


}
