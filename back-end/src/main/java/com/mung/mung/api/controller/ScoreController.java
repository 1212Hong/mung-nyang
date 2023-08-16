package com.mung.mung.api.controller;

import com.mung.mung.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/score")
public class ScoreController {


    private final ScoreService scoreService;

    @GetMapping("/get")
    public ResponseEntity<HashMap<String, Integer>> returnScore(@RequestParam String roomId) {
        return new ResponseEntity<>(scoreService.returnScore(roomId), HttpStatus.OK);
    }
}
