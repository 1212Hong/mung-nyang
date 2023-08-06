package com.mung.mung.api.response;

import com.mung.mung.db.entity.Quiz;
import lombok.*;

@Getter
@NoArgsConstructor
public class QuizStartRes {

    private String roomId;

    private String question;

    private String answer1;

    private String answer2;

    @Builder
    public QuizStartRes(String roomId, Quiz quiz){
        this.roomId = roomId;
        this.question = quiz.getQuestion();
        this.answer1 = quiz.getAnswer1();
        this.answer2 = quiz.getAnswer2();

    }

}
