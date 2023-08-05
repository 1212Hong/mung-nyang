package com.mung.mung.api.controller;

import com.mung.mung.api.response.VoteResultRes;
import com.mung.mung.api.response.VoteStartRes;
import com.mung.mung.api.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final VoteService voteService;

    @PostMapping("/start")
    public ResponseEntity<VoteStartRes> startVote(@RequestParam(required = true) String roomId) {
        voteService.startVote(roomId);

        return ResponseEntity.ok(new VoteStartRes(roomId));
    }

    @PostMapping("/count")
    public ResponseEntity<String> countVote(@RequestParam(required = true) String roomId) {

        String result = voteService.countVote(roomId);

        return ResponseEntity.ok(result);

    }

    @GetMapping("/result")
    public ResponseEntity<VoteResultRes> getVoteResult(@RequestParam String roomId) {
        VoteResultRes voteResultRes = voteService.getVoteResult(roomId);

        return ResponseEntity.ok(voteResultRes);
    }


}
