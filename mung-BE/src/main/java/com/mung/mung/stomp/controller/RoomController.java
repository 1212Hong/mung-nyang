package com.mung.mung.stomp.controller;

import com.mung.mung.stomp.response.StompRoomJoinRes;
import com.mung.mung.stomp.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class RoomController {

    private final RoomService roomService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/join/{roomId}")
    public void joinGameSession (@DestinationVariable String roomId){
        log.info("req STOMP /stomp/gamesession/join/{}", roomId);
        StompRoomJoinRes res = roomService.joinPlayerInfo(roomId);

        log.info("res STOMP /stomp/gamesession/join/{} - res : {}", roomId, res);
        simpMessagingTemplate.convertAndSend("/sub/" + roomId  , res);

    }

    @MessageMapping("/{roomId}/leave")
    public void leaveGameSession (SimpMessageHeaderAccessor simpMessageHeaderAccessor, @DestinationVariable int roomId){
        log.info("room id : {}", roomId);


//        RoomJoinRes res =

    }



}
