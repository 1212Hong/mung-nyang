package com.mung.mung.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizPlayersWordRes {
    private String playerWord;
    private String liarName;
}
