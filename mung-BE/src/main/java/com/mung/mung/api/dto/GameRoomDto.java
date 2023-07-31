package com.mung.mung.api.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class GameRoomDto {
    private String roomTitle;
    private String roomPw;
    private String roomUrl;

    @QueryProjection
    public GameRoomDto(String roomTitle, String roomPw, String roomUrl) {
        this.roomTitle = roomTitle;
        this.roomPw = roomPw;
        this.roomUrl = roomUrl;
    }
}
