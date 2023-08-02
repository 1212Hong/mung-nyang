package com.mung.mung.stomp.response;

import com.mung.mung.db.enums.StompMessageType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class StompRoomJoinRes {

    private final StompMessageType type = StompMessageType.JOIN;
    private final String owner;
    private final List<String> players;

}
