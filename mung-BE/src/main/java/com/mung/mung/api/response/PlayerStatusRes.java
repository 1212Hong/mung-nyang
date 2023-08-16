package com.mung.mung.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlayerStatusRes {

    private long playerId;
    private String roomId;
    private String playerNickname;
    private int playerScore;
    private boolean owner;

    @Builder
    public PlayerStatusRes(long playerId, String roomId, String playerNickname, int playerScore, boolean owner) {
        this.playerId = playerId;
        this.roomId = roomId;
        this.playerNickname = playerNickname;
        this.playerScore = playerScore;
        this.owner = owner;
    }
}
