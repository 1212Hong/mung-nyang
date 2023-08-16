package com.mung.mung.api.controller;

import com.mung.mung.api.response.DanceRes;
import com.mung.mung.api.service.PenaltyService;
import com.mung.mung.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/penalty")
public class PenaltyController {
    private final PenaltyService penaltyService;
    private final ScoreService scoreService;

    @GetMapping("")
    public ResponseEntity<DanceRes> getPenalty() {
        return new ResponseEntity<>(penaltyService.getRandomDance(), HttpStatus.OK);
    }

    @GetMapping("/player") // penalty player 점수 기준으로 계산 후 반환
    public ResponseEntity<String> penaltyPlayer(@RequestParam String roomId) {
        return new ResponseEntity<>(penaltyService.getPenaltyPlayer(scoreService.returnScore(roomId)), HttpStatus.OK);
    }

}
