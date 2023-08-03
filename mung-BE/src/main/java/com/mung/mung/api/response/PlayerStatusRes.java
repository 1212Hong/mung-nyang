package com.mung.mung.api.response;

import lombok.*;

@Getter
public class PlayerStatusRes {

    private long playerId;
    private String roomId;
    private String playerNickname;
    private int playerScore;
    @Builder
    public PlayerStatusRes(long playerId, String roomId, String playerNickname, int playerScore){
        this.playerId=playerId;
        this.roomId=roomId;
        this.playerNickname=playerNickname;
        this.playerScore=playerScore;
    }
}
