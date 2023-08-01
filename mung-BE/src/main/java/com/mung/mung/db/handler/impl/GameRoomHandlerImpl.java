package com.mung.mung.db.handler.impl;

import com.mung.mung.db.dao.GameRoomDAO;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.handler.GameRoomHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class GameRoomHandlerImpl implements GameRoomHandler{
    GameRoomDAO gameRoomDAO;

    @Autowired
    public GameRoomHandlerImpl(GameRoomDAO gameRoomDAO){
        this.gameRoomDAO = gameRoomDAO;
    }


    @Override
    public GameRoom createGameRoom(long roomPk, String roomTitle, String roomPw, String roomUrl){
        GameRoom gameRoom = GameRoom.builder()
                            .roomPk(roomPk).roomTitle(roomTitle).roomPw(roomPw).roomUrl(roomUrl).build();
        // GameRoom 에는 builder가 없으므로 위와 같이 생성해야함
        return gameRoomDAO.createGameRoom(gameRoom);
    }

    public GameRoom getGameRoom(long roomPk){
        return gameRoomDAO.getGameRoom(roomPk);

    } // 어떤 값을 사용할지 추후 결정


}
