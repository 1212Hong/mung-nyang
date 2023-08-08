package com.mung.mung.api.controller;

import com.mung.mung.api.request.RoomIdReq;
import com.mung.mung.api.request.VoteCountReq;
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
    public ResponseEntity<VoteStartRes> startVote(@RequestBody RoomIdReq roomIdReq) {
        voteService.startVote(roomIdReq.getRoomId());

        return ResponseEntity.ok(new VoteStartRes(roomIdReq.getRoomId()));
    }

    @PostMapping("/count")
    public ResponseEntity<VoteCountRes> countVote(@RequestBody VoteCountReq voteCountReq) {

        VoteCountRes voteCountRes = voteService.countVote(voteCountReq);

        return ResponseEntity.ok(voteCountRes);

    }

    @GetMapping("/result")
    public ResponseEntity<VoteResultRes> getVoteResult(@RequestBody VoteSetReq voteSetReq) {
        VoteResultRes voteResultRes = voteService.getVoteResult(voteSetReq);

        return ResponseEntity.ok(voteResultRes);
    }


}
