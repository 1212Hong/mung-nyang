//package com.mung.mung.db.handler.impl;
//
//import com.mung.mung.db.dao.GameRoomDAO;
//import com.mung.mung.db.entity.GameRoom;
//import com.mung.mung.db.handler.GameRoomHandler;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//
//@Service
//@Transactional
//public class GameRoomHandlerImpl implements GameRoomHandler{
//    GameRoomDAO gameRoomDAO;
//
//    @Autowired
//    public GameRoomHandlerImpl(GameRoomDAO gameRoomDAO){
//        this.gameRoomDAO = gameRoomDAO;
//    }
//
//
////    @Override
////    public GameRoom createGameRoom(String roomId, String roomPw){
////        GameRoom gameRoom = GameRoom.builder()
////                            .roomId(roomId).roomPw(roomPw).build();
////        // GameRoom 에는 builder가 없으므로 위와 같이 생성해야함
////        return gameRoomDAO.createGameRoom(gameRoom);
////    }
//
////    public GameRoom getGameRoom(String roomId){
////        return gameRoomDAO.getGameRoom(roomId);
////
////    } // 어떤 값을 사용할지 추후 결정
//
//
//}
