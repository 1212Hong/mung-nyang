package com.mung.mung.api.service;

import com.mung.mung.api.request.VoteCountReq;
import com.mung.mung.api.request.VoteSetReq;
import com.mung.mung.api.response.VoteCountRes;
import com.mung.mung.api.response.VoteResultRes;

public interface VoteService {
    void startVote(String roomId);

    VoteCountRes countVote(VoteCountReq voteCountReq);

    VoteResultRes getVoteResult(VoteSetReq voteSetReq);

    void resetVote(String roomId);
}
