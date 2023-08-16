package com.mung.mung.api.request;

import lombok.Getter;

@Getter // RoomId만 받는 Request로 재사용이 많아 하나로 통일함
public class RoomIdReq {
    private String roomId;
}

