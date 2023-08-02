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
import com.mung.mung.api.request.GameRoomConnectReq;
import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.api.service.GameRoomService;
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
    private final GameRoomService gameRoomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    // 방 관리
    private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();

    @Autowired
    public GameRoomController(GameRoomService gameRoomService){
        this.gameRoomService=gameRoomService;
    }

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/api/game-sessions")
    public ResponseEntity<String> CreateRoom(@RequestBody GameRoomCreateReq gameRoomCreateReq)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // makeRoom에서 return으로 중복된 Id가 있는지 없는지를 판단 후 중복이라면 Data 생성 없이 false값을 return함
        boolean createSuccess = gameRoomService.makeRoom(gameRoomCreateReq.getRoomId(), gameRoomCreateReq);
        if (createSuccess) {
            this.mapSessions.put(gameRoomCreateReq.getRoomId(), 1);
            // customSessionId를 한글로 할 수 없음 => 시간되면 한글로 바꾸기!
            // Db에 customSessionId colum을 만들고 roomId를 아스키변환해 숫자로 저장해 사용할 수도 있음
            // GameRoomCreateReq 정보를 Map으로 변환 내장 라이브러리를 사용하기 위해서는 customSessionId로 hashMap을 만들어 주어야 함
            Map<String, Object> gameInfoMap = new HashMap<>();
            gameInfoMap.put("customSessionId", gameRoomCreateReq.getRoomId());
            gameInfoMap.put("roomPw", gameRoomCreateReq.getRoomPw());

            System.out.println(gameInfoMap);

            SessionProperties properties = SessionProperties.fromJson(gameInfoMap).build();
//        log.info("properties : ", String.valueOf(properties));
            Session session = openvidu.createSession(properties);
//        log.info("session : ",String.valueOf(session));
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("방 생성에 실패했습니다.", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    @PostMapping("/api/game-sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId, // react의 create token method임
                                                   @RequestBody GameRoomConnectReq gameRoomConnectReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId); // 이 부분에서 session을 바탕으로 연결
        if (session == null) {
            return new ResponseEntity<>("해당하는 방을 찾을 수 없습니다.",HttpStatus.NOT_FOUND);
        }


        // 인원수가 LIMIT보다 작다면 인원수 1 추가
        if (this.mapSessions.get(sessionId)<LIMIT){
            this.mapSessions.put(sessionId, this.mapSessions.get(sessionId) + 1);
        } else{ // LIMIT이 됐다면 접근불가
            return new ResponseEntity<>("방 인원이 다 찼습니다.",HttpStatus.FORBIDDEN);
        }

        System.out.println("첫 방 개설자도 확인해보기");
        System.out.println("Connection test");
        Map<String, Object> gameConnectionInfoMap = new HashMap<>();
//        gameConnectionInfoMap.put("customSessionId", gameRoomConnectReq.getRoomId());
        gameConnectionInfoMap.put("roomPw", gameRoomConnectReq.getRoomPw());
        System.out.println(gameConnectionInfoMap);

        ConnectionProperties properties = ConnectionProperties.fromJson(gameConnectionInfoMap).build();
        Connection connection = session.createConnection(properties); //이 부분이 연결을 담당하는 부분
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}