package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository  extends JpaRepository<Player, Long>, PlayerRepositoryCumstom {
}
