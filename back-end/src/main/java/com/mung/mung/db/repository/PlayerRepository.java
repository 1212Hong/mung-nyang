package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long>, PlayerRepositoryCumstom {
    //player의 Id로 조회
    Player findByPlayerId(long playerId);

    void deleteByPlayerId(long playerId);

}
