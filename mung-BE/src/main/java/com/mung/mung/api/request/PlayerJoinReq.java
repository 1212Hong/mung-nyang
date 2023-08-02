package com.mung.mung.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class PlayerJoinReq {
    private String roomId;
    private String pnIckname; // 닉네임 받아오기
    private String Test;
}
