package com.mung.mung.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@Builder
public class GameRoomJoinRes {
    private String playerId;
    private String pIp;
    private String pNickName;
    // private int owner;

}
