package com.mung.mung.api.controller;

import com.mung.mung.api.dto.GameRoomDto;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.GameRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gamerooms")
public class GameRoomController {

    private final GameRoomRepository gameRoomRepository;

    @GetMapping("/search/{room-title}")
    public GameRoomDto searchMemberV1(@PathVariable("room-title") String roomtitle) {
        return gameRoomRepository.findByTitle(roomtitle);
    }

}
