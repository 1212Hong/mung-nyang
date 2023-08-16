package com.mung.mung.api.controller;

import com.mung.mung.api.request.RoomIdReq;
import com.mung.mung.api.request.VoteCountReq;
import com.mung.mung.api.request.VoteSetReq;
import com.mung.mung.api.response.VoteCountRes;
import com.mung.mung.api.response.VoteResultRes;
import com.mung.mung.api.response.VoteStartRes;
import com.mung.mung.api.service.VoteService;
import com.mung.mung.db.enums.GameProcessType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/start")
    public ResponseEntity<VoteStartRes> startVote(@RequestBody RoomIdReq roomIdReq) {
        voteService.startVote(roomIdReq.getRoomId());

        return ResponseEntity.ok(new VoteStartRes(GameProcessType.startGameVote));
    }

    @PostMapping("/count")
    public ResponseEntity<VoteCountRes> countVote(@RequestBody VoteCountReq voteCountReq) {

        VoteCountRes voteCountRes = voteService.countVote(voteCountReq);

        return ResponseEntity.ok(voteCountRes);

    }

    @PostMapping("/result")
    public ResponseEntity<VoteResultRes> getVoteResult(@RequestBody VoteSetReq voteSetReq) {
        VoteResultRes voteResultRes = voteService.getVoteResult(voteSetReq);

        return ResponseEntity.ok(voteResultRes);
    }

    @DeleteMapping("/resetVote/{roomId}")
    public ResponseEntity<String> deleteVoteResult(@PathVariable String roomId) {

        String deRoomId = URLDecoder.decode(roomId, StandardCharsets.UTF_8);

        voteService.resetVote(deRoomId);

        return ResponseEntity.ok(roomId + " : 시작 투표 정보 삭제");

    }


}
