package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

//q클래스 static으로 선언
import static com.mung.mung.db.entity.QGameRoom.gameRoom;

@RequiredArgsConstructor
public class GameRoomRepositoryImpl implements GameRoomRepositoryCustom{
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
