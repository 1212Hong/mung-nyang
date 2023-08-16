package com.mung.mung.api.response;

import com.mung.mung.db.enums.GameProcessType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateRoomRes {
    String roomId;
    String roomPw;

    @Builder
    public CreateRoomRes(String roomId, String roomPw) {
        this.roomId=roomId;
        this.roomPw=roomPw;
    }
}
