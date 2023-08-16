package com.mung.mung.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizResultRes {

    private int pickedAnswer;
    private String answerer;
}
