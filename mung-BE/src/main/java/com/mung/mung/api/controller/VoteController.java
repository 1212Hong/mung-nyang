package com.mung.mung.api.controller;

import com.mung.mung.api.request.VoteSetReq;
import com.mung.mung.api.response.VoteCountRes;
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
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/start")
    public ResponseEntity<VoteStartRes> startVote(@RequestParam String roomId) {
        voteService.startVote(roomId);

        return ResponseEntity.ok(new VoteStartRes(roomId));
    }

    @PostMapping("/count")
    public ResponseEntity<VoteCountRes> countVote(@RequestParam String roomId) {

        String voteCheck = voteService.countVote(roomId);

        return ResponseEntity.ok(new VoteCountRes(roomId, voteCheck));

    }

    @GetMapping("/result")
    public ResponseEntity<VoteResultRes> getVoteResult(@RequestParam String roomId, @RequestBody VoteSetReq voteSetReq) {
        VoteResultRes voteResultRes = voteService.getVoteResult(roomId, voteSetReq.getGameSet());

        return ResponseEntity.ok(voteResultRes);
    }


}
