package com.mung.mung.api.controller;

import com.mung.mung.api.response.GameStartRes;
import com.mung.mung.api.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/start")
    public ResponseEntity<GameStartRes> startVote(@RequestParam(required = true) String roomId) {
        voteService.startVote(roomId);

        return ResponseEntity.ok(new GameStartRes(roomId));
    }

    @PostMapping("/count")
    public ResponseEntity<String> countVote(@RequestParam(required = true) String roomId) {

        String result = voteService.countVote(roomId);

        return ResponseEntity.ok(result);

    }

    @GetMapping("/result")
    public ResponseEntity<String> getVoteResult(@RequestParam String roomId) {
        String result = voteService.getVoteResult(roomId);
        return ResponseEntity.ok(result);
    }


}
