package com.mung.mung.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class EmergencyAnswerReq {
    private long setId;
    private String roomId;
    private String playerNickname;
    private String answer;
}
