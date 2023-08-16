package com.mung.mung.api.service;

import com.mung.mung.api.request.LiarSubmitVoteReq;
import com.mung.mung.api.response.LiarAnswerOptionsRes;
import com.mung.mung.api.response.LiarVoteResultRes;

public interface LiarService {
    String submitLiarVote(LiarSubmitVoteReq liarSubmitVoteReq);

    LiarVoteResultRes getLiarVoteResult(long setId);

    void resetVote(long setId);

    LiarAnswerOptionsRes getLiarAnswerOptions(long setId);

}
