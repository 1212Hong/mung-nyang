package com.mung.mung.api.controller;

import com.mung.mung.api.request.LiarSubmitVoteReq;
import com.mung.mung.api.response.LiarAnswerOptionsRes;
import com.mung.mung.api.response.LiarVoteResultRes;
import com.mung.mung.api.service.LiarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/liar")
public class LiarController {

    private final LiarService liarService;


    @PostMapping("/vote")
    public ResponseEntity<String> submitLiarVote(@Valid @RequestBody LiarSubmitVoteReq liarSubmitVoteReq) {

        String message = liarService.submitLiarVote(liarSubmitVoteReq);

        return ResponseEntity.ok(message);

    }

    @GetMapping("/result")
    public ResponseEntity<LiarVoteResultRes> getLiarVoteResult(@RequestParam long setId) {

        LiarVoteResultRes liarVoteResultRes = liarService.getLiarVoteResult(setId);

        return ResponseEntity.ok(liarVoteResultRes);

    }

    @DeleteMapping("/resetVote/{setId}")
    public ResponseEntity<String> deleteLiarVoteResult(@PathVariable long setId) {

        liarService.resetVote(setId);

        return ResponseEntity.ok(setId + " : liar 투표 정보 삭제");

    }

    @GetMapping("/options")
    public ResponseEntity<LiarAnswerOptionsRes> getLiarAnswerOptions(@RequestParam long setId) {

        LiarAnswerOptionsRes liarAnswerOptionsRes = liarService.getLiarAnswerOptions(setId);

        return ResponseEntity.ok(liarAnswerOptionsRes);

    }


}
