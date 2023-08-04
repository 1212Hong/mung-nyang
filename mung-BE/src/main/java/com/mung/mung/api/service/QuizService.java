package com.mung.mung.api.service;

import com.mung.mung.api.response.VoteResultRes;

public interface QuizService {
    void startQuiz(String roomId);

    String countQuiz(String roomId);

    VoteResultRes getQuizResult(String roomId);

    String getplayerRoles(String roomId);

}
