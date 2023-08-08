package com.mung.mung.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class VoteCountRes {
    private String roomId;
    private String voteCheck;
}
