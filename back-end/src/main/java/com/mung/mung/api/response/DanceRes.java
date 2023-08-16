package com.mung.mung.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DanceRes {
    private String danceUrl;
    private String difficulty;

    @Builder
    public DanceRes(String danceUrl, String difficulty) {
        this.danceUrl = danceUrl;
        this.difficulty = difficulty;
    }

}
