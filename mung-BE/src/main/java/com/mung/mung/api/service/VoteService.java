package com.mung.mung.api.service;

public interface VoteService {
    void startVote(String roomId);

    String countVote(String roomId);

    String getVoteResult(String roomId);
}
