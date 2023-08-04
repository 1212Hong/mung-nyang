package com.mung.mung.api.response;

import com.mung.mung.db.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizStartRes {

    private String roomId;

    private Quiz quizs;

}
