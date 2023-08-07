package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizResultReq {
    private String roomId;
    private Long gameId;
}
