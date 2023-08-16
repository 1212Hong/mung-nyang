package com.mung.mung.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class GameRoomCreateReq {

    // customSessionId => roomId
    private String roomId;
    private String roomPw;

}
