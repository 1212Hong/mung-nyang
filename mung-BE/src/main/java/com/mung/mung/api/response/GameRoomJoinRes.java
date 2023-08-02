package com.mung.mung.api.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class GameRoomJoinRes {
    private final String playerId;
    private String pIp;
    private String pNickName;
    // private int owner;

}
