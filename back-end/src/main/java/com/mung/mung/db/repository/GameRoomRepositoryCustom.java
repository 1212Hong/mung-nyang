package com.mung.mung.db.repository;

// Custom 에 사용할 메소드 정의 -> Impl 상세 쿼리 작성
public interface GameRoomRepositoryCustom {

    String findOwner(String roomId);


}
