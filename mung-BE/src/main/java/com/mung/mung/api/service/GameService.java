package com.mung.mung.api.service;

import org.springframework.stereotype.Service;

public interface GameService {
    void startVote(String roomId);

    String countVote(String roomId);

    String getVoteResult(String roomId);
}
