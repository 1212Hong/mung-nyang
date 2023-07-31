package com.mung.mung.api.controller;

import com.mung.mung.api.dto.GameRoomDto;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.GameRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gamerooms")
public class GameRoomController {

    private final GameRoomRepository gameRoomRepository;

    @GetMapping("/search/{room-title}")
    public GameRoomDto searchMemberV1(@PathVariable("room-title") String roomtitle) {
        return gameRoomRepository.findByTitle(roomtitle);
        // find(엔터티_생략가능)By컬럼명
    }

    @ResponseBody
    @PostMapping(value="/create/{room-title}")
    public GameRoomDto createTest(@PathVariable("room-title") String roomTitle,
                                  @RequestBody GameRoomDto requestDto){
        // DAO를 만들 필요가 없음...... repository에서 이미 save등의 메소드가 구현되어 있기 때문에 controller에서 구현해도 됨;
        String pw = requestDto.getRoomPw();
        String url = requestDto.getRoomUrl();

        // 새로운 GameRoom 객체 생성 및 값 설정
        GameRoom newGameRoom = new GameRoom();
        newGameRoom.setRoomTitle(roomTitle);
        newGameRoom.setRoomPw(pw);
        newGameRoom.setRoomUrl(url);

        // 게임 방 저장
        gameRoomRepository.save(newGameRoom);

        // GameRoomDto로 변환하여 반환
        return new GameRoomDto(newGameRoom.getRoomTitle(), newGameRoom.getRoomPw(), newGameRoom.getRoomUrl());
    }


}
