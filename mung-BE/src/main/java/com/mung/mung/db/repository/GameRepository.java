package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

    Game findByGameId(Long gameId);
}