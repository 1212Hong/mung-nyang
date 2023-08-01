//package com.mung.mung.db.dao.impl;
//
//import com.mung.mung.db.dao.GameRoomDAO;
//import com.mung.mung.db.entity.GameRoom;
//import com.mung.mung.db.repository.GameRoomRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class GameRoomDAOImpl implements GameRoomDAO {
//
//    GameRoomRepository gameRoomRepository;
//
//    @Autowired
//    public GameRoomDAOImpl(GameRoomRepository gameRoomRepository){
//        this.gameRoomRepository=gameRoomRepository;
//    }
//
//    @Override
//    public GameRoom createGameRoom(GameRoom gameRoom)
//    {
//        gameRoomRepository.save(gameRoom);
//        return gameRoom;
//    }
//
////    @Override
////    public GameRoom getGameRoom(long gameId){
////        GameRoom gameRoom = gameRoomRepository.getById(gameId);
////        return gameRoom;
////    }
//}
