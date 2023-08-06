package com.mung.mung.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizResultRes {

    private String roomId;
    private Long setId;
    private String answerer;
}
