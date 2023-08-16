package com.mung.mung.api.response;

import com.mung.mung.db.enums.GameProcessType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AnswerRes {
    String resultReturn;
    private GameProcessType gameProcessType;

    @Builder
    public AnswerRes(String resultReturn, GameProcessType gameProcessType) {
        this.resultReturn = resultReturn;
        this.gameProcessType = gameProcessType;
    }

}
