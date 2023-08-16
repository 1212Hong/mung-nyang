package com.mung.mung.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteSetReq {

    private String roomId;

    private int maxSet;
}
