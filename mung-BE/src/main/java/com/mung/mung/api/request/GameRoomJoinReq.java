package com.mung.mung.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class GameRoomJoinReq {
    private String pNickname; // 닉네임 받아오기
}
