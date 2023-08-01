package com.mung.mung.stomp.controller;

import com.mung.mung.stomp.response.RoomJoinRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class RoomController {

    @MessageMapping("/{roomId}/join")
    public void joinGameSession (@DestinationVariable int roomId){
        log.info("room id : {}", roomId);

//        RoomJoinRes res =

    }


}
