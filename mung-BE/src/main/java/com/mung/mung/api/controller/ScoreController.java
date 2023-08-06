package com.mung.mung.api.controller;

import com.mung.mung.api.service.GameRoomService;
import com.mung.mung.api.service.ScoreService;
import com.mung.mung.db.entity.Player;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/score")
public class ScoreController {


    private final ScoreService scoreService;
    private final GameRoomService gameRoomService;
    @GetMapping("/{roomId}")
    public ResponseEntity<HashMap> returnScore(@PathVariable("roomId") String roomId){
        HashMap<String, Integer> playerScore=new HashMap<>();
        List<Player> players=scoreService.returnScore(roomId);
        for (Player player : players){
            playerScore.put(player.getPlayerNickname(),player.getPlayerScore());
        }
        return new ResponseEntity<>(playerScore, HttpStatus.OK);
    }
}
