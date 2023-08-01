// @RequiredArgsConstructor
// @RestController
// @RequestMapping("/gamerooms")
// public class GameRoomController {

//     private final GameRoomRepository gameRoomRepository;

//     @GetMapping("/search/{room-title}")
//     public GameRoomDto searchMemberV1(@PathVariable("room-title") String roomtitle) {
//         return gameRoomRepository.findByTitle(roomtitle);
//         // find(엔터티_생략가능)By컬럼명
//     }

//     @ResponseBody
//     @PostMapping(value="/create/{room-title}")
//     public GameRoomDto createTest(@PathVariable("room-title") String roomTitle,
//                                   @RequestBody GameRoomDto requestDto){
//         // DAO를 만들 필요가 없음...... repository에서 이미 save등의 메소드가 구현되어 있기 때문에 controller에서 구현해도 됨;
//         String pw = requestDto.getRoomPw();
//         String url = requestDto.getRoomUrl();

//         // 새로운 GameRoom 객체 생성 및 값 설정
//         GameRoom newGameRoom = new GameRoom();
//         newGameRoom.setRoomTitle(roomTitle);
//         newGameRoom.setRoomPw(pw);
//         newGameRoom.setRoomUrl(url);

//         // 게임 방 저장
//         gameRoomRepository.save(newGameRoom);

//         // GameRoomDto로 변환하여 반환
//         return new GameRoomDto(newGameRoom.getRoomTitle(), newGameRoom.getRoomPw(), newGameRoom.getRoomUrl());
//     }


// }



package com.mung.mung.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import com.google.gson.Gson;
import com.mung.mung.api.request.GameRoomCreateReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

//@CrossOrigin(origins = "*")
@Slf4j
@RestController
public class GameRoomController {

    private final int LIMIT = 6;
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    // 방 관리
    private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();
    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    // 수정한 내용들 저장


    //    @PostMapping("/api/game-sessions")
//    public ResponseEntity<GameRoomCreateRes> CreateRoom(@RequestBody GameRoomCreateReq gameRoomCreateReq)
//            throws OpenViduJavaClientException, OpenViduHttpException {

    //-=======================================

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/game-sessions")
    public ResponseEntity<String> CreateRoom(@RequestBody GameRoomCreateReq gameRoomCreateReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("params");
        this.mapSessions.put(gameRoomCreateReq.getCustomSessionId(),1);

        String roomPw=gameRoomCreateReq.getRoomPw();
        System.out.println(roomPw);
        // pw일치여부만 구현하면 됨
//        log.info("params : ", params);

        String GameRoomString = new Gson().toJson(gameRoomCreateReq);
//        SessionProperties properties = SessionProperties.fromJson(GameRoomString).build();
//        System.out.println("내가만든 println");
//        System.out.println(properties);
//        System.out.println(properties);
//
////        log.info("properties : ", String.valueOf(properties));
//        Session session = openvidu.createSession(properties);
////        log.info("session : ",String.valueOf(session));
//        System.out.println("session.getSessionId() 입니당");
//        System.out.println(session);
//        System.out.println(session.getSessionId());
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        return new ResponseEntity<>(gameRoomCreateReq.getCustomSessionId(),HttpStatus.OK);
    }
//    @PostMapping("/api/game-sessions")
//    public ResponseEntity<String> CreateRoom(@RequestBody(required = false) Map<String, String> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        System.out.println("params");
//        System.out.println(params);
//        System.out.println();
//        Class<?> whatClass = params.getClass();
//        System.out.println(whatClass.getName());
//        this.mapSessions.put(params.get("customSessionId"),1);
//        String roomPw=params.get("roomPw");
//        // pw일치여부만 구현하면 됨
////        log.info("params : ", params);
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        System.out.println("내가만든 println");
//        System.out.println(properties);
//        System.out.println(properties);
//
////        log.info("properties : ", String.valueOf(properties));
//        Session session = openvidu.createSession(properties);
////        log.info("session : ",String.valueOf(session));
//        System.out.println("session.getSessionId() 입니당");
//        System.out.println(session);
//        System.out.println(session.getSessionId());
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
//    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/game-sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}