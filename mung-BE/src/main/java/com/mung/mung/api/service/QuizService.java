package com.mung.mung.api.service;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizResultReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizStartRes;

public interface QuizService {
    QuizStartRes startQuiz(String roomId);

    void submitPositiveQuiz(QuizCountReq quizCountReq);

    void submitNegativeQuiz(QuizCountReq quizCountReq);

    QuizResultRes getQuizResult(QuizResultReq quizResultReq);

    QuizPlayersRoleRes getPlayersRole(QuizPlayersRoleReq quizPlayersRoleReq);
}
