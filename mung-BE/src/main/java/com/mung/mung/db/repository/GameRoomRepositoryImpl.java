package com.mung.mung.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.mung.mung.db.entity.QGameRoom.gameRoom;

@RequiredArgsConstructor
public class GameRoomRepositoryImpl implements GameRoomRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public String findOwner(String roomId) {
        return queryFactory
                .select(gameRoom.owner)
                .from(gameRoom)
                .where(gameRoom.roomId.eq(roomId))
                .fetchOne();
    }


}
