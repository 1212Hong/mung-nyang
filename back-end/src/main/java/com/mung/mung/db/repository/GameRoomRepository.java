package com.mung.mung.db.repository;

import com.mung.mung.db.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRoomRepository extends JpaRepository<GameRoom, String>, GameRoomRepositoryCustom {


    //JpaRepository를 사용하면 기본적인 CRUD method는 제공함

    GameRoom findByRoomId(String roomId);

    void deleteByRoomId(String roomId);

    Long countByRoomId(String roomId);


}
