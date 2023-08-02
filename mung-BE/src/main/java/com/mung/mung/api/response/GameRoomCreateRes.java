package com.mung.mung.api.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRoomCreateRes {
    // Room 생성시 Res
    private String roomId;
    private String roomPw;
}
