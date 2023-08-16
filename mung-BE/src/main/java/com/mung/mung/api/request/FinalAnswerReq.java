package com.mung.mung.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class FinalAnswerReq {
    private long setId;
    private String roomId;
    private String answer;
}
