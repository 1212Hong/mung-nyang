package com.mung.mung.api.response;

import com.mung.mung.db.enums.GameProcessType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizPlayersRoleRes {

    private Long setId;

    private GameProcessType gameProcessType;

}
