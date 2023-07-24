package com.mung.mung.api.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class UserDto {
    private String userId;
    private String userPw;

    @QueryProjection
    public UserDto(String userId, String userPw) {
        this.userId = userId;
        this.userPw = userPw;
    }
}
