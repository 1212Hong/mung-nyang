package com.mung.mung.api.response;

import com.mung.mung.db.enums.GameProcessType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class VoteStartRes {

    private GameProcessType gameProcessType;
}
