package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizPlayersRoleReq {
    private String roomId;
    private Long gameId;
    private String category;
    private String answerer;
}
