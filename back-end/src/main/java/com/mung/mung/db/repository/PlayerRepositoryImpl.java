package com.mung.mung.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.mung.mung.db.entity.QPlayer.player;

@RequiredArgsConstructor
public class PlayerRepositoryImpl implements PlayerRepositoryCumstom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<String> findPlayers(String roomId) {

        return queryFactory
                .select(player.playerNickname)
                .from(player)
                .join(player.gameRoom)
                .where(player.gameRoom.roomId.eq(roomId))
                .fetch();
    }

    @Override
    public Long GetPlayerId(String playerNickname, String roomId) {
        return queryFactory
                .select(player.playerId)
                .from(player)
                .join(player.gameRoom)
                .where(player.gameRoom.roomId.eq(roomId)
                        .and(player.playerNickname.eq(playerNickname)))

                .fetchOne();
    }


}
