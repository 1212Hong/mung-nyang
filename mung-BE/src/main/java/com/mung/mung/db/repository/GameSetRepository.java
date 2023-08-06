package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSetRepository extends JpaRepository<GameSet, Long> {
    GameSet findBySetId(long setId);
}
