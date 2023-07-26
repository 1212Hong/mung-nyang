package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRoomRepository extends JpaRepository<GameRoom, Long>, GameRoomRepositoryCustom {

}
