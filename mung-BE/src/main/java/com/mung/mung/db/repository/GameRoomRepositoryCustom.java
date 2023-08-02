package com.mung.mung.db.repository;

import com.mung.mung.api.dto.GameRoomDto;
import com.mung.mung.db.entity.GameRoom;

import java.util.List;

// Custom 에 사용할 메소드 정의 -> Impl 상세 쿼리 작성
public interface GameRoomRepositoryCustom {
    GameRoomDto findByTitle(String roomTitle);

    String findOwner(String roomId);



}
