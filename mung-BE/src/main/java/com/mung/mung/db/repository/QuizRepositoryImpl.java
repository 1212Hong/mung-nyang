package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Quiz;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static com.mung.mung.db.entity.QQuiz.quiz;

@RequiredArgsConstructor
public class QuizRepositoryImpl implements QuizRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public Quiz findRandomQuiz() {

        // ThreadLocalRandom은 java.util.Random를 상속하여
        // 멀티 쓰레드 환경에서 서로 다른 인스턴스들에 의해 의사 난수를 반환하므로 동시성 문제에 안전
        // 테이블 크기가 10 가정하에 1부터 10 중 랜덤한 숫자를 생성
        long randomId = ThreadLocalRandom.current().nextInt(1, 3);

        return queryFactory
                .select(quiz)
                .from(quiz)
//                .where(quiz.id.eq(randomId))
                .orderBy(Expressions.stringTemplate("RAND()").asc())

                .fetchFirst();
    }
}
