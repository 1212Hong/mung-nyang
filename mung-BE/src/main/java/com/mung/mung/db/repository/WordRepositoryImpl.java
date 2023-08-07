package com.mung.mung.db.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.sql.SQLException;
import java.util.List;

import static com.mung.mung.db.entity.QWord.word;

@RequiredArgsConstructor
public class WordRepositoryImpl implements WordRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<String> getRandomTitlesByCategory(String category) {
        return queryFactory
                .select(word.title)
                .from(word)
                .where(word.category.eq(category))
                .orderBy(Expressions.stringTemplate("RAND()").asc())
                .limit(2)
                .fetch();
    }
}