package com.mung.mung.api.service;

import com.mung.mung.api.response.VoteResultRes;

public interface VoteService {
    void startVote(String roomId);

    String countVote(String roomId);

    VoteResultRes getVoteResult(String roomId, int gameSet);
}
