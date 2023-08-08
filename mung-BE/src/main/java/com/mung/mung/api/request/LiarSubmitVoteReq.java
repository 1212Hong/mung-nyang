package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LiarSubmitVoteReq {
    @NotNull(message = "setId는 필수값입니다")
    private long setId;
    private String playerNickname;
}
