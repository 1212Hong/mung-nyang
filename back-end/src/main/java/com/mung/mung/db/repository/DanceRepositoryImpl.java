package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Dance;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.mung.mung.db.entity.QDance.dance;

@RequiredArgsConstructor
public class DanceRepositoryImpl implements DanceRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Dance getRandomDance() {
        return queryFactory
                .select(dance)
                .from(dance)
                .orderBy(Expressions.stringTemplate("RAND()").asc())
                .limit(1)
                .fetchOne();

    }

}
