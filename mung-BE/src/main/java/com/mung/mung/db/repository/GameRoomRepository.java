package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRoomRepository extends JpaRepository<GameRoom, String>, GameRoomRepositoryCustom {

    // 만약 roomId가 있으면 Optional로 감싸 객체를 반환, get을 사용해 객체를 가져올 수 있음.
//    Optional<GameRoom> findByRoomId(String roomId);
    //JpaRepository를 사용하면 기본적인 CRUD method는 제공함

    GameRoom findByRoomId(String roomId);

    Long countByRoomId(String roomId);
}
