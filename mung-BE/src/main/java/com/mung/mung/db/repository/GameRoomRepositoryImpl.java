package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.QGameRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
public class GameRoomRepositoryImpl implements GameRoomRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    QGameRoom qGameRoom = QGameRoom.gameRoom;
    @Override
    public List<GameRoom> findByTitle(String roomTitle) {
        return queryFactory
                .select(qGameRoom)
                .from(qGameRoom)
                .where(qGameRoom.roomTitle.eq(roomTitle))
                .fetch();
    }
}
