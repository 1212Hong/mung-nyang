package com.mung.mung.api.controller;

import com.mung.mung.api.request.RoomIdReq;
import com.mung.mung.api.service.GameRoomService;
import com.mung.mung.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/score")
public class ScoreController {


    private final ScoreService scoreService;
    @GetMapping("/get")
    public ResponseEntity<HashMap<String,Integer>> returnScore(@RequestBody RoomIdReq roomIdReq){
        return new ResponseEntity<>(scoreService.returnScore(roomIdReq.getRoomId()), HttpStatus.OK);
    }
}
