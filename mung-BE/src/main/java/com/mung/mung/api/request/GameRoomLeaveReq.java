package com.mung.mung.api.request;

import lombok.Getter;
import org.springframework.web.bind.annotation.RequestParam;

@Getter
public class GameRoomLeaveReq {
    private String roomId;
    private long playerId;
}
