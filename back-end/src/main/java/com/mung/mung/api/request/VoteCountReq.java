package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteCountReq {
    private String roomId;
    private String voteMessage;
}
