package com.mung.mung.api.response;
import com.mung.mung.db.entity.GameRoom;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter
@Setter
@ToString // 제대로 받았는지 string으로 출력하기 위함
@RequiredArgsConstructor // 불변 생성자 생성
public class GameRoomRes {
    String roomId;
    public static GameRoomRes of(GameRoom GameRoom){
        GameRoomRes res = new GameRoomRes();
        res.setRoomId(GameRoom.getRoomId());
        return res;
    }
    
}
