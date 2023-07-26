package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRoomRepository extends JpaRepository<GameRoom, Long>, GameRoomRepositoryCustom {

    //JpaRepository를 사용하면 기본적인 CRUD method는 제공함
}
