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

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import com.google.gson.Gson;
import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.servlet.view.groovy.GroovyMarkupConfig;

//@CrossOrigin(origins = "*")
@Slf4j
@RestController
public class GameRoomController {

    private final int LIMIT = 6;
    private final RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    // 방 관리
    private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();

    @Autowired
    public GameRoomController(RoomService roomService){
        this.roomService=roomService;
    }

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    @PostMapping("/api/game-sessions")
    public ResponseEntity<String> CreateRoom(@RequestBody GameRoomCreateReq gameRoomCreateReq)
            throws OpenViduJavaClientException, OpenViduHttpException {


        boolean createSuccess = roomService.makeRoom(gameRoomCreateReq.getRoomId(), gameRoomCreateReq);
        if (createSuccess) {
            this.mapSessions.put(gameRoomCreateReq.getRoomId(), 1);

            // GameRoomCreateReq 정보를 Map으로 변환 내장 라이브러리를 사용하기 위해서는 customSessionId로 hashMap을 만들어 주어야 함
            Map<String, Object> gameInfoMap = new HashMap<>();
            gameInfoMap.put("customSessionId", gameRoomCreateReq.getRoomId());
            gameInfoMap.put("roomPw", gameRoomCreateReq.getRoomPw());

            System.out.println(gameInfoMap);
            // DB에 있으면 return Fail 반환하는것 구현해야함?

            // 방 만드는 과정에서 DB에서 중복된게 있는지 확인

            // front에서 Token만 받아서 통신할 수 있는지 테스트 해본 결과 createToken만 통과해도 연결 됨을 확인.
            // pw일치여부만 구현하면 됨
//        log.info("params : ", params);

            SessionProperties properties = SessionProperties.fromJson(gameInfoMap).build();
            System.out.println("내가만든 println");
            System.out.println(properties);

//        log.info("properties : ", String.valueOf(properties));
            Session session = openvidu.createSession(properties);
//        log.info("session : ",String.valueOf(session));
            System.out.println("session.getSessionId() 입니당");
            System.out.println(session.getSessionId());
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("방 생성에 실패했습니다.", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    @PostMapping("/api/game-sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId, // react의 create token method임
                                                   @RequestBody GameRoomCreateReq gameRoomCreateReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("첫 방 개설자도 확인해보기");
        System.out.println("Connection test");
        Map<String, Object> gameConnectionInfoMap = new HashMap<>();
        gameConnectionInfoMap.put("customSessionId", gameRoomCreateReq.getRoomId());
        gameConnectionInfoMap.put("roomPw", gameRoomCreateReq.getRoomPw());
        System.out.println(gameConnectionInfoMap);

        ConnectionProperties properties = ConnectionProperties.fromJson(gameConnectionInfoMap).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}