package com.mung.mung.api.request;

import lombok.Getter;

@Getter
public class RecordingStopReq {
    String roomId;
    long gameId;
}
