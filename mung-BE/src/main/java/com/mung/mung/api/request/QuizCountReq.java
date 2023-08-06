package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizCountReq {

    private String roomId;
    private String playerNickname;

}
