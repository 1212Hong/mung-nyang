package com.mung.mung.api.controller;

import com.mung.mung.api.request.*;
import com.mung.mung.api.response.*;
import com.mung.mung.api.service.LiarService;
import com.mung.mung.api.service.QuizService;
import com.mung.mung.api.service.VoteService;
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

    @DeleteMapping("/resetVote")
    public ResponseEntity<Void> getLiarVoteResult(@RequestBody LiarSetIdReq liarSetIdReq) {

        liarService.resetVote(liarSetIdReq.getSetId());

        return ResponseEntity.noContent().build();

    }

    @GetMapping("/options")
    public ResponseEntity<LiarAnswerOptionsRes> deleteLiarVoteResult(@RequestParam long setId) {

        LiarAnswerOptionsRes liarAnswerOptionsRes = liarService.getLiarAnswerOptions(setId);

        return ResponseEntity.ok(liarAnswerOptionsRes);

    }


}
