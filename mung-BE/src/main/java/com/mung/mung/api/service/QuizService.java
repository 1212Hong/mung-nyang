package com.mung.mung.api.service;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizPlayersWordRes;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizStartRes;

public interface QuizService {
    QuizStartRes startQuiz(Long gameId);

    void submitPositiveQuiz(QuizCountReq quizCountReq);

    void submitNegativeQuiz(QuizCountReq quizCountReq);

    QuizResultRes getQuizResult(String roomId);

    QuizPlayersRoleRes getPlayersRole(QuizPlayersRoleReq quizPlayersRoleReq);

    QuizPlayersWordRes getPlayerWord(Long setId, String playerNick);
}
